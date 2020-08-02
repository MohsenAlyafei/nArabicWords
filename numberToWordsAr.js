/*********************************************************************
* @function    : numberToWordsAr(Number, [{options}])
* @purpose     : Converts Numbers to Arabic Words
* @version     : 1.13
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
* {TextAfter}  : "on": Indicates that there will be text to follow the resulting text.
*                This affects the duble hundrders and scale names like الفا مليونا مئتا.
*                This permits proper subject name to be added after the resulting text.
*
* @returns     : {string} The wordified number string in Arabic.
**********************************************************************/
const TableScales =["","ألف","مليون","بليون","ترليون","كوادرليون","كوينتليون","سكستليون"],
      TableScalesP=["","آلاف","ملايين","بلايين"],
      TableMale   =["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"],
      TableFemale =["","واحدة","اثنتان","ثلاث","أربع","خمس","ست","سبع","ثمان","تسع","عشر"];

export function numberToWordsAr(NumIn=0, {Feminine="", Comma="", SplitHund="", Miah="", TextAfter=""}={}) {
if (NumIn == 0) return "صفر";                          // if 0 or "0" then "zero"
let Triplet, digits, TableUnits, Table11_19, NumberInWords= "",IsLastEffTriplet= false,
    SpWa= " و", ON= "on";
Miah= (Miah===ON) ? "مئة" : "مائة";   // Select chosen Miah (Hundred) Option

// ---- Pickup the Default Table (Masculine)
TableUnits    = TableMale;              // Point to Male Table
Table11_19    = [...TableMale];         // Create a copy of Male Table for later manipulation
Table11_19[0] = TableFemale[10];        // borrow word "عشرة" from Female's Table used in 11-19
Table11_19[1] = "أحد";                  // Feminine starting words for 11
Table11_19[2] = "إثنا";                 // Feminine starting words for 12

NumIn = "0".repeat((NumIn+="").length * 2 % 3) + NumIn; // Convert Number to a Triplets String
let L = NumIn.length;
for (digits= L; digits>0; digits-=3) {                  // Loop and convert each Triplet
  Triplet = +NumIn.substr(L-digits,3);                  // Get a Triplet Number
  IsLastEffTriplet= !+NumIn.substr(L-digits+3);         // Determine if Last Effective Triplet
  if (Triplet) {                                        // If not Empty: Convert Triplet Number to Words
  NumberInWords += oneTripletToWords(TableScales[digits/3-1]);
  if (!IsLastEffTriplet) NumberInWords+= (Comma===ON ? "،" :"") + SpWa; // Add "و " and Option Comma
  }
}
return NumberInWords; // All done
//------------------------------------------------------------------
//    Core Function Converts 1 Triplet (1 to 999) to Arabic Words
//------------------------------------------------------------------
function oneTripletToWords(Scale) {
let Num_100  = ~~(Triplet/100),             // Hundreds (1 digit)
    Num_99   = Triplet % 100,               // 00 to 99
    Num_Unit = Num_99 % 10,                 // 0 to 9 (1 digit)
    Num_Tens = ~~(Num_99/10),               // Tens   (1 digit)
    Word_100 = "", Word_99= "";             // Holds words for Hundreds & 0-99
// ---- If Feminine, then use the Feminine table only if Last Effective Triplet
if (Feminine === ON && IsLastEffTriplet)  {
   TableUnits    = [...TableFemale];        // Create a copy of Female Table for later manipulation
   Table11_19    = [...TableFemale];        // Create a copy of Female Table for later manipulation
   Table11_19[0] = TableMale[10];           // borrow word "عشر" from Male's Table used in 11-19
   Table11_19[1] = "إحدى";                  // Feminine starting words for 11
   Table11_19[2] = "إثنتا";                 // Feminine starting words for 12
   if (Num_99 > 19) TableUnits[1] = "إحدى"; // Feminine word for 1 used in 20's to 90's
  }
// ---- Do Hundreds (100 to 900)
if (Num_100) {
 if (Num_100 >2) Word_100 = TableFemale[Num_100] + (SplitHund===ON ?" ":"") + Miah;// 300-900
 else if (Num_100 === 1) Word_100 = Miah;                                 // 100
 else Word_100 = Miah.slice(0,-1) +(Scale && !Num_99 || TextAfter ?"تا":"تان");//For 200 Use either مئتا or مئتان
}
// ----  Do 0-99
if (Num_99 >19)  Word_99 = TableUnits[Num_Unit] + (Num_Unit ? SpWa : "") +  // 20-99 Units و and
                 (Num_Tens === 2 ? "عشر" : TableFemale[Num_Tens]) + "ون";   // Add Woon for 20's or 30's to 90's
   else Word_99= Num_99 > 10 ? Table11_19[Num_99-10] + " " + Table11_19[0]: // 11-19
                 TableUnits[Num_99];                                        // 1-10

let Words999 = Word_100 + (Num_100 && Num_99 ? SpWa:"") + Word_99;          // Join Hund, Tens, and Units
if (Scale) {                                                                // Add Scale Name if applicable
  let Word_100Wa = (Num_100 ? Word_100 + SpWa :"") + Scale,n=digits/3-1;    // Default Scale Name
  if (Num_99 > 2) {                                                         // 3 to 99
    Words999 += " "+(Num_99 >10 ? Scale+"ًا" : (n<4?TableScalesP[n]:TableScales[n]+"ات")) // For 3 to 99
  } else {
    if (!Num_99) Words999+= " " +Scale;                                     // 0
    else if (Num_99 === 1) Words999 = Word_100Wa;                           // 1
    else Words999 = Word_100Wa + (IsLastEffTriplet && TextAfter===ON ? "ا" : "ان"); // For 2 اثنا or اثنان
    }
}
return Words999; //Return the Triple in Words with Scale Name
}
}
