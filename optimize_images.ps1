param(
    [string]$inputPath,
    [string]$outputPath = $null
)

if (-not $outputPath) {
    $outputPath = $inputPath
}

Add-Type -AssemblyName System.Drawing

$image = [System.Drawing.Image]::FromFile($inputPath)

# Resize to max 800x600 while maintaining aspect ratio
$maxWidth = 800
$maxHeight = 600
$ratioX = $maxWidth / $image.Width
$ratioY = $maxHeight / $image.Height
$ratio = [Math]::Min($ratioX, $ratioY)

$newWidth = [int]($image.Width * $ratio)
$newHeight = [int]($image.Height * $ratio)

$bitmap = New-Object System.Drawing.Bitmap $newWidth, $newHeight
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)

# Save with quality 80%
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80L)

$tempPath = [System.IO.Path]::GetTempFileName() + ".jpg"
$bitmap.Save($tempPath, $encoder, $encoderParams)

$image.Dispose()
$bitmap.Dispose()
$graphics.Dispose()

Move-Item -Path $tempPath -Destination $outputPath -Force

Write-Host "Image optimized and saved to $outputPath"