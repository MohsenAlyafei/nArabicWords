/*********************************************************************
* @function    : numberToWordsAr(Number, [{options}])
* @purpose     : Converts Numbers to Arabic Words with Grammar Rules
* @version     : 1.50
* @author      : Mohsen Alyafei
* @date        : 02 August 2020
* @param       : {Number} [integer or number in string form]
* @param       : 5 Options passed as object key/values as follows when "on":
*
* {Feminine}   : "on": Generate string for a Feminine subject.
*                The default is Musculine (أرقام بصيغة المؤنث).
* {Miah}       : "on": Use Mi'ah (مئة بدل مائة). Default is Ma'ah "مائة".
* {Comma}      : "on": Insert comma between triplet words.
* {SplitHund}  : "on": Split number from hundred words (فصل الرقم عن المئة).
                 i.e. ثلاث مائة. Default "No Split" i.e. (ثلاثمائة).
* {UseBillions}: "on": Use Billions (بليون) instead of Miliard (مليار).
* {TextAfter}  : "on": Indicates that there will be text to follow the resulting text.
*                This affects the duble hundrders and scale names like الفا مليونا مئتا.
*                This permits proper subject name to be added after the resulting text.
* {Accusative} : Text is produced in Accusative (نصب) case. Default is Nominitive (رفع).
* {Genitive}   : Text is produced in Genitive (جر) case. Default is Nominitive (رفع).
*
* @returns     : {string} The wordified number string in Arabic.
**********************************************************************/
const TableScales =["","ألف","مليون","مليار","ترليون","كوادرليون","كوينتليون","سكستليون"], // Add here only
      TableScalesP=["","آلاف","ملايين","مليارات"], // Do not change this table
      TableMale   =["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"],
      TableFemale =["","واحدة","اثنتان","ثلاث","أربع","خمس","ست","سبع","ثمان","تسع","عشر"];

export function numberToWordsAr(NumIn=0,
{Feminine="", Comma="", SplitHund="", Miah="", UseBillions="",TextAfter="",Accusative="",Genitive=""}={}) {
if (NumIn == 0) return "صفر";                          // if 0 or "0" then "zero"
let Triplet, digits, Scale, ScalePlural, ScalePos, TableUnits, Table11_19,
    NumberInWords   = "",
    IsLastEffTriplet= false,
    ON       = "on",        // Flag to test if Option is ON
    GrammarAG= (Accusative===ON||Genitive===ON),  // Option Accusative or Genitive ?
    SpWa     = " و",        // AND word
    Ahad     = "أحد",       // Musculine 11 and 1's in 20-90
    Ehda     = "إحدى",      // Feminine 11 and 1's in 20-90
    TanweenLetter = "ًا",    // Tanween Fatih for Scale Names above 10
    Taa      = GrammarAG ? "تي" :    "تا",      // For Hundred 2's مئتا/مائتا
    Taan     = GrammarAG ? "تين" :   "تان",     // For Hundred 2's مئتان/مائتان
    Aa       = GrammarAG ? "ي" :     "ا",       // For Scale 2's الفا مليونا
    Aan      = GrammarAG ? "ين" :    "ان",      // For Scale 2's الفان مليونان
    Ethna    = GrammarAG ? "اثني" :  "اثنا",    // Musculine 12 starting word
    Ethnata  = GrammarAG ? "اثنتي" : "اثنتا",   // Feminine 12 starting word
    Ethnan   = GrammarAG ? "اثنين" : "اثنان",   // Musculine 2
    Ethnatan = GrammarAG ? "اثنتين" : "اثنتان", // Feminine 2
    Woon     = GrammarAG ? "ين" :     "ون";      // Second part of 20's to 90's

Miah= (Miah===ON) ? "مئة" : "مائة";   // Select chosen Miah (Hundred) Option
// ---- Pickup the Default Table (Musculine)
TableUnits    = [...TableMale];         // Create a copy of Musculine Table for later manipulation
Table11_19    = [...TableMale];         // Create a copy of Musculine Table for later manipulation
Table11_19[0] = TableFemale[10];        // borrow word "عشرة" from Female's Table for use in 11-19
Table11_19[1] = Ahad;                   // Musculine starting words for 11
Table11_19[2] = Ethna;                  // Musculine starting words for 12
TableUnits[2] = Ethnan;                 // Musculine word 2

//if (UseBillions)

NumIn = "0".repeat((NumIn+="").length * 2 % 3) + NumIn; // Convert Number to a Triplets String
let L = NumIn.length;
for (digits= L; digits>0; digits-=3) {                  // Loop and convert each Triplet
  Triplet = +NumIn.substr(L-digits,3);                  // Get a Triplet Number
  IsLastEffTriplet= !+NumIn.substr(L-digits+3);         // Determine if Last Effective Triplet
  if (Triplet) {                                        // If not Empty: Convert Triplet Number to Words
   ScalePos    = digits/3-1;                            // Position of Scale Name in Scale Table
   Scale       = TableScales[ScalePos];
   ScalePlural = (ScalePos<4 ? TableScalesP[ScalePos] : TableScales[ScalePos] + "ات");
   if (UseBillions && ScalePos===3) Scale="بليون", ScalePlural="بلايين"; // If UseBillions Option
   NumberInWords += oneTripletToWords();                                 // Convert 1 Triplet to Words
  if (!IsLastEffTriplet) NumberInWords+= (Comma===ON ? "،" :"") + SpWa;  // Add "و " and Option Comma
  }
}
return NumberInWords; // All done
//------------------------------------------------------------------
//    Core Function Converts 1 Triplet (1 to 999) to Arabic Words
//------------------------------------------------------------------
function oneTripletToWords() {
let Num_100  = ~~(Triplet/100),             // Hundreds (1 digit)
    Num_99   = Triplet % 100,               // 00 to 99
    Num_Unit = Num_99 % 10,                 // 0 to 9 (1 digit)
    Num_Tens = ~~(Num_99/10),               // Tens   (1 digit)
    Word_100 = "", Word_99= "";             // Holds words for Hundreds & 0-99
// ---- If Feminine, then use the Feminine table only if Last Effective Triplet
if (Feminine === ON && IsLastEffTriplet)  {
   TableUnits    = [...TableFemale];        // Create a copy of Feminine Table for later manipulation
   Table11_19    = [...TableFemale];        // Create a copy of Feminine Table for later manipulation
   Table11_19[0] = TableMale[10];           // borrow word "عشر" from Musculine's Table for use in 11-19
   Table11_19[1] = Ehda;                    // Feminine starting words for 11
   Table11_19[2] = Ethnata;                 // Feminine starting words for 12
   TableUnits[2] = Ethnatan;                // Feminine word 2
   if (Num_99 > 19) TableUnits[1] = Ehda;   // Feminine word for 1 used in 20's to 90's
}
// ---- Do Hundreds (100 to 900)
if (Num_100) {
 if (Num_100 >2) Word_100 = TableFemale[Num_100] + (SplitHund===ON ?" ":"") + Miah;// 300-900
 else if (Num_100 === 1) Word_100 = Miah;                                 // 100
 else Word_100 = Miah.slice(0,-1) +(Scale && !Num_99 || TextAfter ?Taa:Taan);//For 200 Use either مئتا or مئتان
}
// ----  Do 0-99
if (Num_99 >19)  Word_99 = TableUnits[Num_Unit] + (Num_Unit ? SpWa : "") +  // 20-99 Units و and
                 (Num_Tens === 2 ? "عشر" : TableFemale[Num_Tens]) + Woon;   // Add Woon for 20's or 30's to 90's
   else Word_99= Num_99 > 10 ? Table11_19[Num_99-10] + " " + Table11_19[0]: // 11-19
                 TableUnits[Num_99];                                        // 1-10

let Words999 = Word_100 + (Num_100 && Num_99 ? SpWa:"") + Word_99;          // Join Hund, Tens, and Units
if (Scale) {                                                                // Add Scale Name if applicable
  let Word_100Wa = (Num_100 ? Word_100 + SpWa :"") + Scale;                 // Default Scale Name
  if (Num_99 > 2) {                                                         // 3 to 99
    Words999 += " "+(Num_99 >10 ? Scale+TanweenLetter: ScalePlural);        // For 3 to 99
  } else {
    if (!Num_99) Words999+= " " +Scale;                                     // 0
    else if (Num_99 === 1) Words999 = Word_100Wa;                           // 1
    else Words999 = Word_100Wa + (IsLastEffTriplet && TextAfter===ON ? Aa : Aan); // For 2 ألفا or ألفان
    }
}
return Words999; //Return the Triple in Words with Scale Name
}
}
