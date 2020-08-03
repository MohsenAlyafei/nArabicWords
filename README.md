# Numbers to Arabic Words with Grammar

### The function provides a simple and effective method for converting Numbers (Integers) to Arabic Words in accordance with (and with options for) Arabic grammar rules/settings. It does not use any extrnal dependancies (libraries) and is short that you can just copy and paste it into your larger application for immediate use.

### 1. Syntax:

#### numberToWordsAr( number [{options}] );

### 2. Examples:

In it s basic form, the function can be simply invoked for any number by passing only the first paraneter; as follows:

```javascript
console.log( numberToWordsAr(2000) );         // "ألفان"
console.log( numberToWordsAr(15000120) );     // "خمسة عشر مليونًا ومائة وعشرون"
console.log( numberToWordsAr(2020) );         // "ألفان وعشرون"

```
Output:
```javascript
ألفان
خمسة عشر مليونًا ومائة وعشرون
ألفان وعشرون
```

If the number is too large to be handled by the system/javascript, place the number in quotes, example:

```javascript
console.log(numberToWordsAr( "233000000000000000000000") ); // مائتان وثلاثة وثلاثون سكستليونًا
```
Output:
```javascript
مائتان وثلاثة وثلاثون سكستليونًا
```

***As can be seen from the above, the default output is using the Nominative grammar case (حالة الرفع).***

## 3. Defaults:

The function uses the following as defaults:

1. Nominative Grammar Case (حالة الرفع).
2. Masculine Subject.
3. The Arabic Short Scale Numbering Systems (i.e. Short Scale with Miliard (مليار)).
4. The word "مائة" for Hundreds.
5. No text is assumed to be added after the resulting output text.
6. Maximum scale of Sextillion (سكستليون) i.e. 1 with 23 zeros.

All of the above defaults (and more) may be changed with the option settings.

## 4. Option Settings

### Summary Options Table

| No.| Option |Default|Purpose  
|:---:|:---|:---:|:-----
|1|Feminine       |off| Produce output text for a feminine subject.
|2|Miah           |off| Selects between "مئة" (off) and "مائة" (on) style. Default is "مائة".
|3|SplitHund      |off| Use separation between number and hundred words (e.g. ثلاثمائة becomes ثلاث مائة).
|4|Comma          |off| Insert a comma between triplet number text.
|5|Billions       |off| Use Billions (بليون) instead of Millard (مليار).
|6|AG             |off| Text is produced in the Accusative/Genitive (جر/نصب) case. Default is Nominative (رفع).
|7|TextAfter      |off| Indicates that there will be text to follow the resulting number text. This permits the proper subject name to be added after the resulting text.

### 4.1 Option {Feminine : "on"}

If the "subject" to be counted is "feminine" then use this option to produce the grammatically correct result.

Examples with both the defults and with the option {Feminine : "on"}:

```javascript
console.log( numberToWordsAr(12) );                      // "اثنا عشر"
console.log( numberToWordsAr(12, {Feminine:"on"}) );     // "اثنتا عشرة"

console.log( numberToWordsAr(23) );                      // "ثلاثة وعشرون"
console.log( numberToWordsAr(23,{Feminine:"on"}) );      // "ثلاث وعشرون"

console.log( numberToWordsAr(13013) );                   // "ثلاثة عشر ألفًا وثلاثة عشر"
console.log( numberToWordsAr(13013 ,{Feminine:"on"}) );  // "ثلاثة عشر ألفًا وثلاث عشرة"

console.log( numberToWordsAr(200011) );                  // "مائتا ألف وأحد عشر"
console.log( numberToWordsAr(200011,{Feminine:"on"}) );  // "مائتا ألف وإحدى عشرة"
```

### 4.2 Option {Miah : "on"}

This option permits the word "مائة" to be changed to "مئة". Many country official documents prefer the use of the word "مئة".
This option affects all places where the word Hundred is used.

Examples with both the defults and with the option {Miah: "on"}:

With the defults:

```javascript
console.log( numberToWordsAr(100) );                  // Default: "مائة"
console.log( numberToWordsAr(100,{Miah:"on"}) );      // "مئة"

console.log( numberToWordsAr(200) );                  // Default: "مائتان"
console.log( numberToWordsAr(200,{Miah:"on"}) );      // "مئتان"

console.log( numberToWordsAr(350) );                  // Default: "ثلاثمائة وخمسون"
console.log( numberToWordsAr(350,{Miah:"on"}) );      // "ثلاثمئة وخمسون"
```

### 4.3 Option {SplitHund : "on"}

This option permits the splitting/separation of the unit name from the hundred words. Some Arabic countries consider this to be the correct method for writing the numbers from 300 to 900. The "ثلاثمائة" becomes "ثلاث مائة" and "أربعمائة" becomes "أربع مائة", and so on.

Examples with both the defults and with the option {SplitHund: "on"}:

With the defults:

```javascript
console.log( numberToWordsAr(300) );            // "ثلاثمائة"
console.log( numberToWordsAr(300) );            // "ثلاث مائة"

console.log( numberToWordsAr(500) );            // "خمسمائة"
console.log( numberToWordsAr(500) );            // "خمس مائة"

console.log( numberToWordsAr(600) );            // "ستمائة"
console.log( numberToWordsAr(600) );            // "ست مائة"

console.log( numberToWordsAr(2700) );           // "ألفان وسبعمائة"
console.log( numberToWordsAr(2700) );           // "ألفان وسبع مائة"
```

### 4.4 Option {Comma : "on"}

This option adds a comma "،" between the triplet number strings. This may assist in having a more readable and accurate text, especially for large numbers.

Examples with both the defults and with the option {Comma: "on"}:

With the defults:

```javascript
console.log( numberToWordsAr(122500) );                   // "مائة واثنان وعشرون ألفًا وخمسمائة"
console.log( numberToWordsAr(122500    ,{Comma:"on"}) );  // "مائة واثنان وعشرون ألفًا، وخمسمائة"

console.log( numberToWordsAr(100100100) );                // "مائة مليون ومائة ألف ومائة"
console.log( numberToWordsAr(100100100 ,{Comma:"on"}) );  // "مائة مليون، ومائة ألف، ومائة"
```


### 4.5 Option {Billions : "on"}

This option permits the use of the pure Short Scale Numbering System (using Billions) (UK/USA system) rather than the Arabic Short Scale System. It is to be noted that the Arabic Short Scale System is exactly a Short Scale System except that the word Billion at 10^9 is replaced with Miliard (all other scale names remain unchanged). Most Arabic-language countries and regions use the short scale with 10^9 being مليار (milyar), except for a few countries like Saudi Arabia and the UAE which use the word بليون billion for 10^9. More information on countries using the system can be found here on Wikipedia: [Arabic_Speaking_Long_and_Short_Scales](https://en.wikipedia.org/wiki/Long_and_short_scales#Arabic-speaking).

Examples with both the defults and with the option {Billions: "on"}:

With the defults:

```javascript
console.log( numberToWordsAr(2002002000) );                     // "ملياران ومليونان وألفان"
console.log( numberToWordsAr(2002002000  ,{Billions:"on"}) );   // "بليونان ومليونان وألفان"

console.log( numberToWordsAr(2452452000) );                     // "ملياران وأربعمائة واثنان وخمسون مليونًا وأربعمائة واثنان وخمسون ألفًا"
console.log( numberToWordsAr(2452452000  ,{Billions:"on"}) );   // "بليونان وأربعمائة واثنان وخمسون مليونًا وأربعمائة واثنان وخمسون ألفًا"

console.log( numberToWordsAr((2452002000) );                    // "ملياران وأربعمائة واثنان وخمسون مليونًا وألفان"
console.log( numberToWordsAr((2452002000  ,{Billions:"on"}) );  // "بليونان وأربعمائة واثنان وخمسون مليونًا وألفان"

console.log( numberToWordsAr(255000000000) );                   // "مائتان وخمسة وخمسون مليارًا"
console.log( numberToWordsAr(255000000000,{Billions:"on"}) );   // "مائتان وخمسة وخمسون بليونًا"
```

### 4.6 Option {AG : "on"}

Using this option, the output text is produced in the Accusative/Genitive (جر/نصب) case. Default is Nominative (رفع).

Examples with both the defults and with the option {AG: "on"}:

```javascript
console.log( numberToWordsAr(2) );                    // "اثنان"
console.log( numberToWordsAr(2,{AG:"on"}) );          // "اثنين"

console.log( numberToWordsAr(12) );                   // "اثنا عشر"
console.log( numberToWordsAr(12,{AG:"on"}) );         // "اثني عشر"

console.log( numberToWordsAr((122) );                 // "مائة واثنان وعشرون"
console.log( numberToWordsAr((122,{AG:"on"}) );       // "مائة واثنين وعشرين"

console.log( numberToWordsAr(2452452000) );           //"ملياران وأربعمائة واثنان وخمسون مليونًا وأربعمائة واثنان وخمسون ألفًا"
console.log( numberToWordsAr(2452452000,{AG:"on"}) ); //"مليارين وأربعمائة واثنين وخمسين مليونًا وأربعمائة واثنين وخمسين ألفًا"
```
