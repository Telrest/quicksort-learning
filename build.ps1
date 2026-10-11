param([string]$EmccPath = 'emcc')
$ErrorActionPreference = 'Stop'

# 输出目录包含要上传到 GitHub Pages 的文件。
# The output folder contains the files to upload to GitHub Pages.
$webOutput = Join-Path $PSScriptRoot 'dist'
New-Item -ItemType Directory -Force -Path $webOutput | Out-Null
Copy-Item -Path (Join-Path $PSScriptRoot 'public\*') -Destination $webOutput -Force

& $EmccPath (Join-Path $PSScriptRoot 'src\algorithm.c') `
    -O2 -Wall -Wextra --no-entry `
    '-sEXPORTED_FUNCTIONS=_run_partition,_get_result,_get_pivot' `
    '-sEXPORTED_RUNTIME_METHODS=ccall' `
    '-sMODULARIZE=1' '-sEXPORT_NAME=createPartitionModule' `
    '-sENVIRONMENT=web,node' `
    -o (Join-Path $webOutput 'partition.js')

if ($LASTEXITCODE -ne 0) { throw '网页编译失败 / Web build failed.' }
Write-Output "网页文件 / Web files: $webOutput"
