# generate-icons.ps1
# Generates all favicon / PWA icon assets for Stage Hop using System.Drawing (no installs needed).
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

Add-Type -AssemblyName System.Drawing

$project = Split-Path $PSScriptRoot -Parent
Write-Host "Output dir: $project"

# Unicode code points avoid UTF-8/ANSI encoding issues in PS 5.1
# Note: [char]+[char] does integer addition in PS; cast to string first
$CH_MAIN  = [string][char]0x6625 + [string][char]0x58F0  # 春声
$CH_SMALL = [string][char]0x6625                          # 春

# ── Helpers ──────────────────────────────────────────────────────────────────

function New-G($bmp) {
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    return $g
}

function Center-SF {
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment     = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Near
    $sf.FormatFlags   = [System.Drawing.StringFormatFlags]::NoClip -bor `
                        [System.Drawing.StringFormatFlags]::NoWrap
    return $sf
}

# ── Icon renderer ─────────────────────────────────────────────────────────────
#
# Colors match site light-mode CSS variables:
#   BG   = --bg:   #F4F1EB
#   FG   = --text: #1A1714
#   GOLD = --gold: #8A6800  (used for subtitle)
#
# Layout (fractions of safe-area height h):
#   12%   ornament diamond center
#   20%   top of "春声" text rect     | font = h*0.32 pt (~38% visible height)
#   63%   divider line
#   67%   top of "Stage Hop" rect     | font = h*0.13 pt (~15% visible height)
#
# Fonts: SimSun Bold (Chinese) + Palatino Linotype Italic (English subtitle)

function Draw-Icon([int]$S, [bool]$Maskable = $false) {
    $bmp = New-Object System.Drawing.Bitmap($S, $S)
    $g   = New-G $bmp

    $BG     = [System.Drawing.ColorTranslator]::FromHtml("#F4F1EB")
    $FG     = [System.Drawing.ColorTranslator]::FromHtml("#1A1714")
    $GOLD   = [System.Drawing.ColorTranslator]::FromHtml("#8A6800")
    $bgBr   = New-Object System.Drawing.SolidBrush($BG)
    $fgBr   = New-Object System.Drawing.SolidBrush($FG)
    $goldBr = New-Object System.Drawing.SolidBrush($GOLD)

    $g.FillRectangle($bgBr, 0, 0, $S, $S)

    $safe = if ($Maskable) { 0.80 } else { 1.0 }
    $pad  = [float](($S * (1 - $safe)) / 2)
    $h    = [float]($S * $safe)

    if ($S -ge 48) {
        $sf = Center-SF

        # ── Ornament diamond (center at 12%) ───────────────────────────────
        $ornCY = [float]($pad + $h * 0.12)
        $ornCX = [float]($S / 2)
        $ornR  = [float]($h * 0.028)

        if ($ornR -ge 2) {
            $pts = [System.Drawing.PointF[]] @(
                [System.Drawing.PointF]::new($ornCX, ($ornCY - $ornR)),
                [System.Drawing.PointF]::new(($ornCX + $ornR * 0.55), $ornCY),
                [System.Drawing.PointF]::new($ornCX, ($ornCY + $ornR)),
                [System.Drawing.PointF]::new(($ornCX - $ornR * 0.55), $ornCY)
            )
            $g.FillPolygon($fgBr, $pts)
        }

        # All fonts use GraphicsUnit.Pixel so sizes are DPI-independent
        $GUP = [System.Drawing.GraphicsUnit]::Pixel

        # ── "春声" (top at 20%, em = h*0.32 px) ───────────────────────────
        $chFS      = [float]($h * 0.32)
        $chFont    = New-Object System.Drawing.Font("SimSun", $chFS, [System.Drawing.FontStyle]::Bold, $GUP)
        $chRectTop = [float]($pad + $h * 0.20)
        $chRect    = New-Object System.Drawing.RectangleF(0, $chRectTop, [float]$S, [float]($h * 0.44))
        $g.DrawString($CH_MAIN, $chFont, $fgBr, $chRect, $sf)

        # ── Divider line (at 63%) ──────────────────────────────────────────
        $lineY  = [float]($pad + $h * 0.63)
        $estW   = [float]($chFS * 2)   # SimSun glyphs ≈ square; 2 chars
        $lineW  = [float]($estW * 0.70)
        $lineX1 = [float](($S - $lineW) / 2)
        $lineX2 = [float](($S + $lineW) / 2)
        $penW   = [float]([Math]::Max(1.0, $h * 0.006))
        $pen    = New-Object System.Drawing.Pen($FG, $penW)
        $g.DrawLine($pen, $lineX1, $lineY, $lineX2, $lineY)
        $pen.Dispose()

        # ── "Stage Hop" (top at 67%, em = h*0.13 px) ──────────────────────
        $subFS   = [float]($h * 0.13)
        $subFont = New-Object System.Drawing.Font("Palatino Linotype", $subFS, [System.Drawing.FontStyle]::Italic, $GUP)
        $subTop  = [float]($lineY + $h * 0.025)
        $subRect = New-Object System.Drawing.RectangleF(0, $subTop, [float]$S, [float]($h * 0.20))
        $g.DrawString("Stage Hop", $subFont, $goldBr, $subRect, $sf)

        $chFont.Dispose(); $subFont.Dispose(); $sf.Dispose()

    } elseif ($S -ge 16) {
        # Small sizes: "春" centered
        $sf2 = New-Object System.Drawing.StringFormat
        $sf2.Alignment     = [System.Drawing.StringAlignment]::Center
        $sf2.LineAlignment = [System.Drawing.StringAlignment]::Center
        $chFS   = [float]($S * 0.55)
        $chFont = New-Object System.Drawing.Font("SimSun", $chFS, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
        $r = New-Object System.Drawing.RectangleF(0, 0, [float]$S, [float]$S)
        $g.DrawString($CH_SMALL, $chFont, $fgBr, $r, $sf2)
        $chFont.Dispose(); $sf2.Dispose()
    }

    $g.Dispose(); $bgBr.Dispose(); $fgBr.Dispose(); $goldBr.Dispose()
    return $bmp
}

function Resize-Bmp($src, [int]$sz) {
    $dst = New-Object System.Drawing.Bitmap($sz, $sz)
    $g   = New-G $dst
    $g.DrawImage($src, 0, 0, $sz, $sz)
    $g.Dispose()
    return $dst
}

function Build-Ico([string[]]$pngPaths, [string]$outPath) {
    $blobs   = $pngPaths | ForEach-Object { [System.IO.File]::ReadAllBytes($_) }
    $sizes   = @(16, 32, 48)
    $n       = $blobs.Count
    $dirOff  = 6 + $n * 16
    $offsets = @(); $cur = $dirOff
    foreach ($b in $blobs) { $offsets += $cur; $cur += $b.Length }

    $ms = New-Object System.IO.MemoryStream
    $bw = New-Object System.IO.BinaryWriter($ms)
    $bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]$n)

    for ($i = 0; $i -lt $n; $i++) {
        $bw.Write([byte]$sizes[$i])
        $bw.Write([byte]$sizes[$i])
        $bw.Write([byte]0); $bw.Write([byte]0)
        $bw.Write([uint16]1); $bw.Write([uint16]32)
        $bw.Write([uint32]$blobs[$i].Length)
        $bw.Write([uint32]$offsets[$i])
    }
    foreach ($b in $blobs) { $bw.Write($b) }
    $bw.Flush()
    [System.IO.File]::WriteAllBytes($outPath, $ms.ToArray())
    $bw.Dispose(); $ms.Dispose()
}

# ── Generate all icons ────────────────────────────────────────────────────────

Write-Host "Drawing 512x512..."
$b512 = Draw-Icon -S 512
$b512.Save("$project\icon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Drawing maskable 512x512..."
$bMask = Draw-Icon -S 512 -Maskable $true
$bMask.Save("$project\icon-maskable-512.png", [System.Drawing.Imaging.ImageFormat]::Png)

foreach ($sz in @(192, 180)) {
    Write-Host "Downscaling to ${sz}x${sz}..."
    $b    = Resize-Bmp $b512 $sz
    $name = if ($sz -eq 180) { "apple-touch-icon" } else { "icon-$sz" }
    $b.Save("$project\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $b.Dispose()
}

Write-Host "Drawing 48x48..."
$b48 = Draw-Icon -S 48
$b48.Save("$project\favicon-48x48.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Drawing 32x32..."
$b32 = Draw-Icon -S 32
$b32.Save("$project\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Drawing 16x16..."
$b16 = Draw-Icon -S 16
$b16.Save("$project\favicon-16x16.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Building favicon.ico (16+32+48)..."
Build-Ico `
    -pngPaths @("$project\favicon-16x16.png", "$project\favicon-32x32.png", "$project\favicon-48x48.png") `
    -outPath "$project\favicon.ico"

$b512.Dispose(); $bMask.Dispose(); $b48.Dispose(); $b32.Dispose(); $b16.Dispose()

Write-Host ""
Write-Host "Done. Files in: $project"
