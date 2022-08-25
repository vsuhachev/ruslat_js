# Ruslat

Ruslat is library for bidirectional transliteration for russian to latin.

It is Javascript implementation of Andrey V. Lukyanov transliteration system.
See <http://tapemark.narod.ru/ruslat.html> for more info.

## Installation

Install from npm:

    $ npm install ruslat

## Usage

```js
import {rusToLat, latToRus, latCaseCorrect, rusTypoCorrect, latTypoCorrect} from 'ruslat'

rusToLat("Привет Мир!") // => "Privet Mir!"
latToRus("Privet Mir!") // => "Привет Мир!"

rusToLat("АЛЁША") // => "ALYoShA"
latCaseCorrect("ALYoShA") // => "ALYOSHA"

var typo = "CAPA"
typo.charCodeAt(0) // => 67
typo.charCodeAt(1) // => 65
typo.charCodeAt(2) // => 80
typo.charCodeAt(3) // => 65

var correct = rusTypoCorrect(typo) // => "САРА"
correct.charCodeAt(0) // => 1057
correct.charCodeAt(1) // => 1040
correct.charCodeAt(2) // => 1056
correct.charCodeAt(3) // => 1040

typo = "Sаrа"
typo.charCodeAt(0) // => 83
typo.charCodeAt(1) // => 1072
typo.charCodeAt(2) // => 114
typo.charCodeAt(3) // => 1072

var correct = latTypoCorrect(typo) // => "Sara"
correct.charCodeAt(0) // => 83
correct.charCodeAt(1) // => 97
correct.charCodeAt(2) // => 114
correct.charCodeAt(3) // => 97
```

## Contributing

Bug reports and pull requests are welcome on GitHub at
<https://github.com/vsuhachev/ruslat_js>. This
project is intended to be a safe, welcoming space for collaboration, and
contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the
[MIT License](http://opensource.org/licenses/MIT).
