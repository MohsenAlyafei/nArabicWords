# Number to Arabic Words with Grammar

### The untility function provides a simple and effective method to converts Numbers (Integers) to Arabic Words in accordance with Arabic grammar rules.

# How to use

### Syntax:

#### numberToWordsAr( number [{options}] );

### Examples:

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
