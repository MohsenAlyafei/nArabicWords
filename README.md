# Numbers to Arabic Words with Grammar

## 1. Description

The purpose of the function is to provide a general-use and a simple yet accurate method for converting Numbers (Integers) to Arabic Words in compliance with (*and with options for*) the Arabic grammar rules/settings.

This includes the ability to correctly produce and handle:
- Gender Subjects (Masculine and Feminine).
- The Nominative, Accusative, and Genitive grammar cases (رفع، جر، ونصب).
- Correct positioning of subject names for ones and twos.
- The.. and ...

The function does not use any external dependencies (libraries) and is sufficiently short that you can (if needed) just copy and paste it into your larger application code for immediate use.

### Syntax:

    numberToWordsAr(number,[ {options} ])

### Parameters:

**number**: Integer in Numeric or String form.
The number may be in Arabic-Indic format (as a string).

**options**: Options passed as object {name:value}. See below

### Rturn Value:

An Arabic text string of the converted number.


## 2. Examples of General Use

In it s basic form, the function can simply be invoked for any integer numbers by passing only the first paraneter; as follows:

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

If the number is too large to be handled by the system/javascript, place the number in quotes, for example:

```javascript
console.log(numberToWordsAr( "233000000000000000000000") ); // مائتان وثلاثة وثلاثون سكستليونًا
```
Output:
```javascript
مائتان وثلاثة وثلاثون سكستليونًا
```

*As can be seen from the above, the default output is using the Nominative grammar case (حالة الرفع).*

## 3. Defaults Values

The function uses the following common grammar rules as its defaults:

1. Nominative Grammar Case (حالة الرفع).
2. Masculine Subject.
3. The Arabic Short Scale Numbering Systems (i.e. Short Scale with Miliard (مليار)).
4. The word "مائة" for Hundreds.
5. No text is assumed to be added after the resulting output text.
6. Maximum scale of Sextillion (سكستليون) i.e. 10^21.

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
|7|TextToFollow   |off| Indicates that there will be text to follow the resulting number text. This permits the proper subject name to be added after the resulting text and the grammatically correct text to be generated for the number.

### 4.1 Option {Feminine : "on"}

If the "subject" to be counted is "feminine" then use this option to produce the grammatically correct result.

Examples with both the default and with the option ***{Feminine : "on"}***:

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

Examples with both the default and with the option ***{Miah: "on"}***:

With the defults:

```javascript
console.log( numberToWordsAr(100) );                  // "مائة"
console.log( numberToWordsAr(100,{Miah:"on"}) );      // "مئة"

console.log( numberToWordsAr(200) );                  // "مائتان"
console.log( numberToWordsAr(200,{Miah:"on"}) );      // "مئتان"

console.log( numberToWordsAr(350) );                  // "ثلاثمائة وخمسون"
console.log( numberToWordsAr(350,{Miah:"on"}) );      // "ثلاثمئة وخمسون"
```

### 4.3 Option {SplitHund : "on"}

This option permits the splitting/separation of the unit name from the hundred words. Some Arabic countries consider this to be the correct method for writing the numbers from 300 to 900. The "ثلاثمائة" becomes "ثلاث مائة" and "أربعمائة" becomes "أربع مائة", and so on.

Examples with both the default and with the option ***{SplitHund: "on"}***:

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

Examples with both the default and with the option ***{Comma: "on"}***:

With the defults:

```javascript
console.log( numberToWordsAr(122500) );                   // "مائة واثنان وعشرون ألفًا وخمسمائة"
console.log( numberToWordsAr(122500    ,{Comma:"on"}) );  // "مائة واثنان وعشرون ألفًا، وخمسمائة"

console.log( numberToWordsAr(100100100) );                // "مائة مليون ومائة ألف ومائة"
console.log( numberToWordsAr(100100100 ,{Comma:"on"}) );  // "مائة مليون، ومائة ألف، ومائة"
```


### 4.5 Option {Billions : "on"}

This option permits the use of the pure (official) Short Scale Numbering System (using Billions) (UK/USA system) rather than the Arabic Short Scale System. It is to be noted that the *Arabic Short Scale System* **is an exact Short Scale System** except that the word Billion (بليون) at position 10^9 is replaced with the word milyar (مليار) (all other scale names remain unchanged). Most Arabic-language countries and regions use the short scale with 10^9 being مليار (milyar), except for a few countries like Saudi Arabia and the UAE which use the word بليون billion for 10^9. More information on countries using the system can be found here on Wikipedia: [Arabic_Speaking_Long_and_Short_Scales](https://en.wikipedia.org/wiki/Long_and_short_scales#Arabic-speaking).

Examples with both the default and with the option ***{Billions: "on"}***:

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

When using this option, the output text is produced in the Accusative/Genitive (جر/نصب) case. The default being the Nominative case (رفع).

Examples with both the defult and with the option ***{AG: "on"}***:

```javascript
console.log( numberToWordsAr(2) );                    // "اثنان"
console.log( numberToWordsAr(2,{AG:"on"}) );          // "اثنين"

console.log( numberToWordsAr(12) );                   // "اثنا عشر"
console.log( numberToWordsAr(12,{AG:"on"}) );         // "اثني عشر"

console.log( numberToWordsAr((122) );                 // "مائة واثنان وعشرون"
console.log( numberToWordsAr((122,{AG:"on"}) );       // "مائة واثنين وعشرين"

console.log( numberToWordsAr(2452452000) );           // "ملياران وأربعمائة واثنان وخمسون مليونًا وأربعمائة واثنان وخمسون ألفًا"
console.log( numberToWordsAr(2452452000,{AG:"on"}) ); // "مليارين وأربعمائة واثنين وخمسين مليونًا وأربعمائة واثنين وخمسين ألفًا"
```


### 4.7 Option {TextToFollow : "on"}

The output text assumes by default that there will be no text is added or to follow the converted number text. Therefore, the output text may not be suitable for adding inside a sentence or to be concatenated to a follow-on text.

Take this example:

The number 2000 will be converted to "ألفان". This is the correct output for a standalone text.

However, if you we want to write "2000 books". You cannot simply say "ألفان كتاب". This is incorrect Arabic.

The output should be "**ألفا كتاب**".

Another example: 20,000 Dollars should be written as "**عشرون ألف دولار**" and not "عشرون ألفًا دولار".

This Option, therefore, permits the converted output text to be made suitable for a text to follow it.


Examples with both the default and with the option ***{TextAfter: "on"}***:

```javascript

console.log( numberToWordsAr(200) +"دينار" );                         // Incorrect ouput: "مائتان دينار"
console.log( numberToWordsAr(200 ,{TextToFollow:"on"}) +"دينار" );    // Correct output : "مائتا دينار"

console.log( numberToWordsAr(2000) +"جنيه" );                         // Incorrect ouput:"ألفان جنيه"
console.log( numberToWordsAr(2000 ,{TextToFollow:"on"}) +"جنيه" );    // Correct output :"ألفا جنيه"

console.log( numberToWordsAr(2000000) +"كتاب" );                      // Incorrect ouput:"مليونان كتاب"
console.log( numberToWordsAr(2000000 ,{TextToFollow:"on"}) +"كتاب" ); // Correct output :"مليونا كتاب"

console.log( numberToWordsAr(20000) +"دولار" );                        // Incorrect ouput:"عشرون ألفًا دولار"
console.log( numberToWordsAr(20000 ,{TextToFollow:"on"}) +"دولار" );   // Correct output :"عشرون ألف دولار"
```

## 5. Increasing the Scale

The Scale can be increased beyond Sextillion (سكستليون) by adding additional elements of the first array `const TableScales`.
Do not change the array for *Plurals* (the constant variable `TableScalesP`) as the conversion of Scale Names to plurals is taken care of by the code.

For example to ncrease the Scale to Quattuordecillion (كواتوردسليون) (i.e. 10^45):
```javascript
const TableScales =["","ألف","مليون","مليار","ترليون","كوادرليون","كوينتليون","سكستليون","سبتليون","وكتليون","نونليون","دسليون","وندسليون","ديودسليون","تريدسليون","كواتوردسليون"],

```
## 6. Using Arabic-Indic Numbers

Arabic-Endic Numbers can be used instead of Arabic numbers if needed.

Example:

```javascript
console.log( numberToWordsAr("٢٤٥٢٤٥٢٠٠٠") ); // out: "ملياران وأربعمائة واثنان وخمسون مليونًا وأربعمائة واثنان وخمسون ألفًا"
```


***
## 7. General Notes on Code

1. Purposely, the function code is made short and heavily commented. Most code is added for the various options.

2. Although the function handles integers only, a factional number (float) can be split and the function called for each part separately (the Whole Part and the Fractional Part).

3. ES6 javascript features are mostly used. This should not create a problem for many browsers.
