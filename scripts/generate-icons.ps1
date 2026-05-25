# generate-icons.ps1
# Generates all favicon / PWA icon assets for Stage Hop using System.Drawing (no installs needed).
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

Add-Type -AssemblyName System.Drawing

$project = Split-Path $PSScriptRoot -Parent
Write-Host "Output dir: $project"

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
# Layout (fractions of safe-area height h):
#   14.5%  ornament diamond center
#   26%    top of "春声" text rect
#   67.5%  divider line
#   70%    top of "Stage Hop" rect

function Draw-Icon([int]$S, [bool]$Maskable = $false) {
    $bmp = New-Object System.Drawing.Bitmap($S, $S)
    $g   = New-G $bmp

    $BG   = [System.Drawing.ColorTranslator]::FromHtml("#F5F0E6")
    $FG   = [System.Drawing.ColorTranslator]::FromHtml("#2A2520")
    $bgBr = New-Object System.Drawing.SolidBrush($BG)
    $fgBr = New-Object System.Drawing.SolidBrush($FG)

    $g.FillRectangle($bgBr, 0, 0, $S, $S)

    $safe = if ($Maskable) { 0.80 } else { 1.0 }
    $pad  = [float](($S * (1 - $safe)) / 2)
    $h    = [float]($S * $safe)

    if ($S -ge 48) {
        $sf = Center-SF

        # ── Ornament diamond ───────────────────────────────────────────────
        $ornCY = [float]($pad + $h * 0.145)
        $ornCX = [float]($S / 2)
        $ornR  = [float]($h * 0.03)

        if ($ornR -ge 2) {
            $pts = [System.Drawing.PointF[]] @(
                [System.Drawing.PointF]::new($ornCX, ($ornCY - $ornR)),
                [System.Drawing.PointF]::new(($ornCX + $ornR * 0.55), $ornCY),
                [System.Drawing.PointF]::new($ornCX, ($ornCY + $ornR)),
                [System.Drawing.PointF]::new(($ornCX - $ornR * 0.55), $ornCY)
            )
            $g.FillPolygon($fgBr, $pts)
        }

        # ── "春声" ─────────────────────────────────────────────────────────
        $chFS   = [float]($h * 0.285)
        $chFont = New-Object System.Drawing.Font("SimSun", $chFS, [System.Drawing.FontStyle]::Bold)

        $chRectTop = [float]($pad + $h * 0.26)
        $chRect    = New-Object System.Drawing.RectangleF(0, $chRectTop, [float]$S, [float]($h * 0.41))
        $g.DrawString("春声", $chFont, $fgBr, $chRect, $sf)

        # ── Divider line ───────────────────────────────────────────────────
        $lineY  = [float]($pad + $h * 0.675)
        # SimSun glyph width ≈ 1.33× point size (96-DPI px per pt)
        $pxPerPt = [float](96.0 / 72.0)
        $estW   = [float]($chFS * $pxPerPt * 2)   # 2 chars
        $lineW  = [float]($estW * 0.78)
        $lineX1 = [float](($S - $lineW) / 2)
        $lineX2 = [float](($S + $lineW) / 2)
        $penW   = [float]([Math]::Max(1.0, $h * 0.007))
        $pen    = New-Object System.Drawing.Pen($FG, $penW)
        $g.DrawLine($pen, $lineX1, $lineY, $lineX2, $lineY)
        $pen.Dispose()

        # ── "Stage Hop" ────────────────────────────────────────────────────
        $subFS   = [float]($h * 0.058)
        $subFont = New-Object System.Drawing.Font("Georgia", $subFS, [System.Drawing.FontStyle]::Italic)
        $subTop  = [float]($lineY + $h * 0.025)
        $subRect = New-Object System.Drawing.RectangleF(0, $subTop, [float]$S, [float]($h * 0.12))
        $g.DrawString("Stage Hop", $subFont, $fgBr, $subRect, $sf)

        $chFont.Dispose(); $subFont.Dispose(); $sf.Dispose()

    } elseif ($S -ge 16) {
        # Small sizes: just "春" centered
        $sf2 = New-Object System.Drawing.StringFormat
        $sf2.Alignment     = [System.Drawing.StringAlignment]::Center
        $sf2.LineAlignment = [System.Drawing.StringAlignment]::Center
        $chFS   = [float]($S * 0.52)
        $chFont = New-Object System.Drawing.Font("SimSun", $chFS, [System.Drawing.FontStyle]::Bold)
        $r = New-Object System.Drawing.RectangleF(0, 0, [float]$S, [float]$S)
        $g.DrawString("春", $chFont, $fgBr, $r, $sf2)
        $chFont.Dispose(); $sf2.Dispose()
    }

    $g.Dispose(); $bgBr.Dispose(); $fgBr.Dispose()
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
