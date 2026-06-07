$files = Get-ChildItem -Path "app" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $updated = $content -replace '<style jsx>', '<style>'
    if ($content -ne $updated) {
        Set-Content -Path $file.FullName -Value $updated -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Done."
