# gulp-head-picker

gulp plugin to extract heading elements from HTML string.

## Install

With npm do:

```
npm install gulp-head-picker
```

## Usage

Input file:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>title</title>
</head>
<body>
  <h1>Heading1</h1>
  <h2>Heading2</h2>
  <h3>Heading3</h3>
  <h4>Heading4</h4>
  <h5>Heading5</h5>
  <h6>Heading6</h6>
</body>
</html>
```

Script:

```javascript
var hp = require('gulp-head-picker');

gulp.src('./sample.html')
    .pipe(hp({
      property: 'toc', // property added to file object
    }))
    .pipe(…)
```

Result:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>title</title>
</head>
<body>
  <h1 id="toc_index_0">Heading1</h1>
  <h2 id="toc_index_1">Heading2</h2>
  <h3 id="toc_index_2">Heading3</h3>
  <h4 id="toc_index_3">Heading4</h4>
  <h5 id="toc_index_4">Heading5</h5>
  <h6 id="toc_index_5">Heading6</h6>
</body>
</html>
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)