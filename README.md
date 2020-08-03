# Numbers to Arabic Words with Grammar

### The utility function provides a simple and effective method for converting Numbers (Integers) to Arabic Words in accordance with Arabic grammar rules.

### 1. Syntax:

#### numberToWordsAr( number [{options}] );

### 2. Examples:

In it s basic form, the function can be simply invoked for any number like this:

```javascript
console.log(numberToWordsAr(2000));         // "ألفان"
console.log(numberToWordsAr(15000120));     // "خمسة عشر مليونًا ومائة وعشرون"
console.log(numberToWordsAr(2020));         // "ألفان وعشرون"

```
Output:
```javascript
ألفان
خمسة عشر مليونًا ومائة وعشرون
ألفان وعشرون
```

If the number is too large to be handled by the system/javascript, place the number in quotes, example:

```javascript
console.log(numberToWordsAr("233000000000000000000000"));
```
Output:
```javascript
مائتان وثلاثة وثلاثون سكستليونًا
```

***As can be seen from the above, the default output is using the Nominative grammar case (حالة الرفع).***

## 3. Defaults:

The utility uses the following as defaults:

1. Nominative Grammar Case (حالة الرفع).
2. Masculine Subject.
3. The Arabic Short Scale Numbering Systems (i.e. Short Scale with Miliard (مليار)).
4. The word "مائة" for the Hundreds.
5. No text as assumed to be after the result text.
6. Maximum scale of Sextillion (سكستليون) i.e. 1 with 23 zeros.

All of the above defaults (and more) may be changed with the option setting.

## 4. Option Settings

### 4.1 Summary Options Table

| No.| Option |Default|Purpose  
|:---:|:---|:---:|:-----
|1|Feminine       |off| Produce output text for a feminine subject.
|2|Miah           |off| Selects between "مئة" (off) and "مائة" (on) style. Default is "مائة".
|3|SplitHund      |off| Use separation between number and hundred words (e.g. ثلاثمائة becomes ثلاث مائة).
|4|Comma          |off| Insert a comma between triplet number text.
|5|Billions       |off| Use Billions (بليون) instead of Millard (مليار).
|6|AG             |off| Text is produced in the Accusative/Genitive (جر/نصب) case. Default is Nominative (رفع).
|7|TextAfter      |off| Indicates that there will be text to follow the resulting number text. This permits the proper subject name to be added after the resulting text.

### 4.2 Option {Feminine : "on"}

If the "subject" to be counted is "feminine" then use this option to produce the grammartically correct result.

Examples:

```javascript
numberToWordsAr(12);                    // Default: "اثنا عشر"
numberToWordsAr(12, {Feminine:"on"});   // "اثنتا عشرة"
```

### 4.3 Option {Miah : "on"}

This options permits the word "مائة" to be changed to "مئة". Many country official documents prefer the use of the word "مئة".
This option affects all places where the word Hundred is used.

Examples:

The defults of the following:

```javascript
numberToWordsAr(100);                    // Default: "مائة"
numberToWordsAr(200);                    // Default: "مائتان"
numberToWordsAr(350);                    // Default: "ثلاثمائة وخمسون"
```
becomes:

```javascript
numberToWordsAr(100,{Miah:"on"});        // Default: "مئة"
numberToWordsAr(200,{Miah:"on"});        // Default: "مئتان"
numberToWordsAr(350,{Miah:"on"});        // Default: "ثلاثمئة وخمسون"
```
