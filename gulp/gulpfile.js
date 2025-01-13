const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

// Função para otimizar imagens usando importação dinâmica
async function compressImages() {
    console.log("Otimizando imagens...");
    const imagemin = (await import('gulp-imagemin')).default; // Importa gulp-imagemin dinamicamente
    return gulp.src('./source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
}

// Função para minificar e ofuscar JavaScript
function compressJavascript() {
    console.log("Minificando e ofuscando JavaScript...");
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

// Função para compilar arquivos SCSS para CSS
function compileSass() {
    console.log("🎨 Compilando SCSS para CSS...");
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' 
        }).on('error', sass.logError)) 
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Tarefa padrão para assistir mudanças nos arquivos
exports.default = function () {
    console.log("Iniciando o watch para SCSS, JS e Imagens...");
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(compressJavascript));
    gulp.watch('./source/img/*', { ignoreInitial: false }, gulp.series(compressImages));
};
