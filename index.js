// coding: utf-8

//++
// (c) 2008 Andrey V. Lukyanov (e-mail: land@long.yar.ru)
// License: I grant anyone the right to use this program
// for any purpose, without any conditions.
//
// (c) 2012-2022 Vasily V. Suhachev, conversion to Javascript
//
// см. http://tapemark.narod.ru/ruslat.html
//
// Обозначения:
// * RUSLAT - rusToLat
// * LATRUS - latToRus
// * CASECORRECT - latCaseCorrect
// * LCORRECT - rusTypoCorrect
//
// RUSLAT перекодирует кириллицу в латиницу.
//
// LATRUS перекодирует латиницу в кириллицу.
//
// Круговое преобразование RUSLAT+LATRUS восстанавливает исходный русский
// текст, причём в любом случае полностью восстанавливается также
// распределение заглавных и строчных букв.
//
// Однако преобразование LATRUS+RUSLAT не обязательно восстанавливает исходный
// текст в латинице.
//
// Скрипт RUSLAT не рассчитан на обработку текста, в котором перепутаны
// русские и латинские буквы (например: а/a, с/c, р/p, у/y и т. п.); в этом
// случае надо предварительно пропустить текст через скрипт LCORRECT.
//
// CASECORRECT исправляет в латинице регистр букв в словах, которые целиком
// должны быть написаны заглавными буквами (например, АЛЁША → ALYoShA →
// ALYOSHA). Обычно применяется преобразование RUSLAT+CASECORRECT. Следует
// учитывать, что изменяется регистр не только в том тексте, который
// изначально был написан русскими буквами, но и там, где изначально была
// латиница, поэтому CASECORRECT не следует применять к текстам программ.
// Кроме того, при круговом преобразовании RUSLAT+CASECORRECT+LATRUS исходный
// русский текст не полностью восстанавливается (состав букв будет полностью
// совпадать, но регистр букв может поменяться). CASECORRECT рассчитан на GNU
// sed, в других вариантах sed он может не работать.
//
// Если в вашей системе используется кодировка, в которой нет значка номера
// (например, КОИ-8), то надо закомментировать или удалить последнюю строку в
// RUSLAT и первую строку замены в LATRUS (т. е. те строки, где есть №/Nh).
//--

// Russian to Latin converter
export function rusToLat(str) {
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьй([аоуАОУ])/g, '$1jy$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ьй([аоуАОУ])/g, '$1Jy$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЙ([аоуАОУ])/g, '$1jY$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЙ([аоуАОУ])/g, '$1JY$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьйе/g, '$1jye')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЙе/g, '$1jYe')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьйЕ/g, '$1jyE')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЙЕ/g, '$1jYE')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ьйе/g, '$1Jye')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЙе/g, '$1JYe')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬйЕ/g, '$1JyE')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЙЕ/g, '$1JYE')

  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])й([аоуАОУ])/g, '$1y$2')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])й([аоуАОУ])/g, '$1y$2')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])Й([аоуАОУ])/g, '$1Y$2')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])Й([аоуАОУ])/g, '$1Y$2')

  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])й([аоуАОУ])/g, '$1y$2')
  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])Й([аоуАОУ])/g, '$1Y$2')
  str = str.replace(/^й([аоуАОУ])/g, 'y$1')
  str = str.replace(/^Й([аоуАОУ])/g, 'Y$1')

  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])йе/g, '$1ye')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])Йе/g, '$1Ye')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])йЕ/g, '$1yE')
  str = str.replace(/([аеёийоуъыьэюяАЕЁИЙОУЪЫЬЭЮЯEe])ЙЕ/g, '$1YE')

  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])йе/g, '$1ye')
  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])Йе/g, '$1Ye')
  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])йЕ/g, '$1yE')
  str = str.replace(/([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])ЙЕ/g, '$1YE')
  str = str.replace(/^йе/g, 'ye')
  str = str.replace(/^Йе/g, 'Ye')
  str = str.replace(/^йЕ/g, 'yE')
  str = str.replace(/^ЙЕ/g, 'YE')

  str = str.replace(/йэ/g, 'йeh')
  str = str.replace(/Йэ/g, 'Йeh')
  str = str.replace(/йЭ/g, 'йEh')
  str = str.replace(/ЙЭ/g, 'ЙEH')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])й/g, '$1ih')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Й/g, '$1Ih')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ье/g, '$1je')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ье/g, '$1Je')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЕ/g, '$1jE')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЕ/g, '$1JE')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьё/g, '$1jo')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ьё/g, '$1Jo')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЁ/g, '$1jO')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЁ/g, '$1JO')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ью/g, '$1ju')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ью/g, '$1Ju')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЮ/g, '$1jU')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЮ/g, '$1JU')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ья/g, '$1ja')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ья/g, '$1Ja')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ьЯ/g, '$1jA')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ЬЯ/g, '$1JA')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ь([бвгджзийклмнпрстфхцчшщБВГДЖЗИЙКЛМНПРСТФХЦЧШЩ])/g, '$1j$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ь([бвгджзийклмнпрстфхцчшщБВГДЖЗИЙКЛМНПРСТФХЦЧШЩ])/g, '$1J$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ь$/g, '$1j')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ь$/g, '$1J')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ь([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])/g, '$1j$2')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ь([^абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯeEyY])/g, '$1J$2')
  str = str.replace(/ь/g, 'jh')
  str = str.replace(/Ь/g, 'Jh')

  str = str.replace(/й/g, 'j')
  str = str.replace(/Й/g, 'J')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])е/g, '$1e')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Е/g, '$1E')
  str = str.replace(/е/g, 'je')
  str = str.replace(/Е/g, 'Je')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ё/g, '$1yo')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ё/g, '$1Yo')
  str = str.replace(/ё/g, 'jo')
  str = str.replace(/Ё/g, 'Jo')

  str = str.replace(/ы([аоуэАОУЭ])/g, 'yh$1')
  str = str.replace(/Ы([аоуэАОУЭ])/g, 'Yh$1')
  str = str.replace(/ы/g, 'y')
  str = str.replace(/Ы/g, 'Y')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])э/g, '$1eh')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Э/g, '$1Eh')
  str = str.replace(/э/g, 'e')
  str = str.replace(/Э/g, 'E')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])ю/g, '$1yu')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Ю/g, '$1Yu')
  str = str.replace(/ю/g, 'ju')
  str = str.replace(/Ю/g, 'Ju')

  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])я/g, '$1ya')
  str = str.replace(/([бвгджзклмнпрстфхцчшщБВГДЖЗКЛМНПРСТФХЦЧШЩ])Я/g, '$1Ya')
  str = str.replace(/я/g, 'ja')
  str = str.replace(/Я/g, 'Ja')

  str = str.replace(/ж/g, 'zh')
  str = str.replace(/ч/g, 'ch')
  str = str.replace(/ш/g, 'sh')
  str = str.replace(/щ/g, 'xh')
  str = str.replace(/Ж/g, 'Zh')
  str = str.replace(/Ч/g, 'Ch')
  str = str.replace(/Ш/g, 'Sh')
  str = str.replace(/Щ/g, 'Xh')

  str = char_translate(str, 'абвгдзиклмнопрстуфхцъАБВГДЗИКЛМНОПРСТУФХЦЪ', 'abvgdziklmnoprstufxcqABVGDZIKLMNOPRSTUFXCQ')

  str = str.replace(/№/g, 'Nh')

  return str
}

// Latin to Russian converter
export function latToRus(str) {
  str = str.replace(/[nN][hH]/g, '№')
  str = str.replace(/e[hH]/g, 'э')
  str = str.replace(/E[hH]/g, 'Э')
  str = str.replace(/i[hH]/g, 'й')
  str = str.replace(/I[hH]/g, 'Й')
  str = str.replace(/j[hH]/g, 'ь')
  str = str.replace(/J[hH]/g, 'Ь')
  str = str.replace(/y[hH]/g, 'ы')
  str = str.replace(/Y[hH]/g, 'Ы')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])ja/g, '$1ья')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jA/g, '$1ьЯ')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Ja/g, '$1Ья')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])JA/g, '$1ЬЯ')
  str = str.replace(/j[aA]/g, 'я')
  str = str.replace(/J[aA]/g, 'Я')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])je/g, '$1ье')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jE/g, '$1ьЕ')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Je/g, '$1Ье')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])JE/g, '$1ЬЕ')
  str = str.replace(/j[eE]/g, 'е')
  str = str.replace(/J[eE]/g, 'Е')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])ji/g, '$1ьи')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jI/g, '$1ьИ')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Ji/g, '$1Ьи')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])JI/g, '$1ЬИ')
  str = str.replace(/ji/g, 'йи')
  str = str.replace(/jI/g, 'йИ')
  str = str.replace(/Ji/g, 'Йи')
  str = str.replace(/JI/g, 'ЙИ')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jo/g, '$1ьё')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jO/g, '$1ьЁ')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Jo/g, '$1Ьё')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])JO/g, '$1ЬЁ')
  str = str.replace(/j[oO]/g, 'ё')
  str = str.replace(/J[oO]/g, 'Ё')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])ju/g, '$1ью')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])jU/g, '$1ьЮ')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Ju/g, '$1Ью')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])JU/g, '$1ЬЮ')
  str = str.replace(/j[uU]/g, 'ю')
  str = str.replace(/J[uU]/g, 'Ю')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])y[aA]/g, '$1я')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Y[aA]/g, '$1Я')
  str = str.replace(/ya/g, 'йа')
  str = str.replace(/yA/g, 'йА')
  str = str.replace(/Ya/g, 'Йа')
  str = str.replace(/YA/g, 'ЙА')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])y[eE]/g, '$1е')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Y[eE]/g, '$1Е')
  str = str.replace(/ye/g, 'йе')
  str = str.replace(/yE/g, 'йЕ')
  str = str.replace(/Ye/g, 'Йе')
  str = str.replace(/YE/g, 'ЙЕ')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])y[oO]/g, '$1ё')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Y[oO]/g, '$1Ё')
  str = str.replace(/yo/g, 'йо')
  str = str.replace(/yO/g, 'йО')
  str = str.replace(/Yo/g, 'Йо')
  str = str.replace(/YO/g, 'ЙО')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])y[uU]/g, '$1ю')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])Y[uU]/g, '$1Ю')
  str = str.replace(/yu/g, 'йу')
  str = str.replace(/yU/g, 'йУ')
  str = str.replace(/Yu/g, 'Йу')
  str = str.replace(/YU/g, 'ЙУ')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])e/g, '$1е')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])E/g, '$1Е')
  str = str.replace(/e/g, 'э')
  str = str.replace(/E/g, 'Э')

  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])j/g, '$1ь')
  str = str.replace(/([bcdfghklmnprstvwxzBCDFGHKLMNPRSTVWXZ])J/g, '$1Ь')
  str = str.replace(/j/g, 'й')
  str = str.replace(/J/g, 'Й')

  str = str.replace(/c[hH]/g, 'ч')
  str = str.replace(/s[hH]/g, 'ш')
  str = str.replace(/x[hH]/g, 'щ')
  str = str.replace(/z[hH]/g, 'ж')

  str = str.replace(/C[hH]/g, 'Ч')
  str = str.replace(/S[hH]/g, 'Ш')
  str = str.replace(/X[hH]/g, 'Щ')
  str = str.replace(/Z[hH]/g, 'Ж')

  str = char_translate(str, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'абцдэфгхийклмнопърстуввхызАБЦДЭФГХИЙКЛМНОПЪРСТУВВХЫЗ')

  return str
}

// Case correct, example: АЛЁША (rusToLat)→ ALYoShA (latCaseCorrect)→ ALYOSHA
export function latCaseCorrect(str) {
  // \u$1 - перевод найденного в верхний регистр.

  var upper1 = function (v0, v1) {
    return v0.replace(v1, v1.toUpperCase())
  }
  var upper2 = function (v0, v1, v2) {
    return v0.replace(v2, v2.toUpperCase())
  }

  str = str.replace(/([A-Z])h([A-Z])/g, '$1H$2')
  //str = str.replace(/J([aeou])([A-Z])/g,'J\u$1$2')
  str = str.replace(/J([aeou])([A-Z])/g, upper1)

  str = str.replace(/([A-Z])([A-Z])h/g, '$1$2H')
  //str = str.replace(/([A-Z])J([aeou])/g,'$1J\u$2')
  str = str.replace(/([A-Z])J([aeou])/g, upper2)
  //str = str.replace(/([BCDFGHKLMNPRSTVWXZ])Y([aeou])/g,'$1Y\u$2')
  str = str.replace(/([BCDFGHKLMNPRSTVWXZ])Y([aeou])/g, upper2)

  str = str.replace(/([A-Z])h ([A-Z][A-Z])/g, '$1H $2')
  //str = str.replace(/J([aeou]) ([A-Z][A-Z])/g,'J\u$1 $2')
  str = str.replace(/J([aeou]) ([A-Z][A-Z])/g, upper1)
  //str = str.replace(/([BCDFGHKLMNPRSTVWXZ])Y([aeou]) ([A-Z][A-Z])/g,'$1Y\u$2 $3')
  str = str.replace(/([BCDFGHKLMNPRSTVWXZ])Y([aeou]) ([A-Z][A-Z])/g, upper2)

  return str
}

const TYPO_RUS = 'асекорихуАВСЕНКМОРТХУ'
const TYPO_LAT = 'acekopuxyABCEHKMOPTXY'

// Typo correct replaces 'cyrillic-look-like' latin symbols to cyrillic ones
export function rusTypoCorrect(str) {
  return char_translate(str, TYPO_LAT, TYPO_RUS)
}


// Typo correct replaces 'latin-look-like' cyrillic symbols to latin ones
export function latTypoCorrect(str) {
  return char_translate(str, TYPO_RUS, TYPO_LAT)
}

function char_translate(str, from, to) {
  for (var i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return str
}
