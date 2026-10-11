$ErrorActionPreference = 'Stop'
$localSdk = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\work\web-c-tools\emsdk-main'))
$localConfig = Join-Path $localSdk '.emscripten-local'
$localCompiler = Join-Path $localSdk 'upstream\emscripten\emcc.exe'
if (!(Test-Path -LiteralPath $localConfig) -or !(Test-Path -LiteralPath $localCompiler)) {
    throw '找不到本地编译工具；请安装 Emscripten 后使用 build.ps1。 / Local compiler unavailable; install Emscripten and use build.ps1.'
}

# 仅对当前构建设置环境，结束后恢复。
# Set the environment only for this build, then restore it.
$previousWebConfig = $env:EM_CONFIG
$previousWebPython = $env:EMSDK_PYTHON
$previousWebTemp = $env:EMCC_TEMP_DIR
try {
    $env:EM_CONFIG = $localConfig
    $env:EMSDK_PYTHON = Join-Path $localSdk 'python\3.13.3_64bit\python.exe'
    $env:EMCC_TEMP_DIR = Join-Path $localSdk 'build-temp'
    New-Item -ItemType Directory -Force -Path $env:EMCC_TEMP_DIR | Out-Null
    & (Join-Path $PSScriptRoot 'build.ps1') -EmccPath $localCompiler
} finally {
    $env:EM_CONFIG = $previousWebConfig
    $env:EMSDK_PYTHON = $previousWebPython
    $env:EMCC_TEMP_DIR = $previousWebTemp
}
