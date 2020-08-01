/*********************************************************************
* @function    : numberToWordsAr(Number, [{options}])
* @purpose     : Converts Numbers to Arabic Words
* @version     : 1.11
* @author      : Mohsen Alyafei
* @date        : 30 July 2020
* @param       : {Number} [integer or number in string form]
* @param       : 5 Options passed as object key/values as follows when "on":
*
* {Feminine}   : "on": Generate string for a Feminine subject.
*                The default is Masculine (أرقام بصيغة المؤنث).
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
const TableScalesSingle= ["","ألف","مليون","بليون","ترليون","كوادرليون","كوينتليون","سكستليون"],
      TableScalesPlural= ["","آلاف","ملايين","بلايين","ترليونات","كوادرليونات","كوينتليونات","سكستليونات"],
      TableMale        = ["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"],
      TableFemale      = ["","واحدة","اثنتان","ثلاث","أربع","خمس","ست","سبع","ثمان","تسع","عشر"];

export function numberToWordsAr(NumIn=0, {Feminine="", Comma="", SplitHund="", Miah="", TextAfter=""}={}) {
if (NumIn == 0) return "صفر";                          // if 0 or "0" then "zero"
let NumberInWords="", IsLastEffTriplet=false,Triplet,digits,TableUnits,Table11_19,SpWa= " و"; // Init vars
Miah = (Miah==="on") ? "مئة" : "مائة";                 // Select chosen Miah (Hundred) Option
// ---- Pickup the Default Table (Masculine)
[TableUnits, Table11_19, Table11_19[0]] = [ [...TableMale], [...TableMale], TableFemale[10] ],
[Table11_19[1], Table11_19[2]         ] = ["أحد" , "إثنا"];  // Masculine starting words for 11 and 12

NumIn = "0".repeat((NumIn+="").length * 2 % 3) + NumIn; // Convert Number to a Triplets String
let L = NumIn.length;
for (digits= L; digits>0; digits-=3) {                  // Loop and convert each Triplet
  Triplet = +(NumIn.substr(L-digits,3));                // Get a Triplet Number
  IsLastEffTriplet= !+NumIn.substr(L-digits+3);         // Remember Last Effective Triplet
  if (Triplet) {                                        // If not Empty: Convert Triplet Number to Words
  NumberInWords += oneTripletToWords(TableScalesSingle[digits/3-1]);
  if (!IsLastEffTriplet) NumberInWords+= (Comma === "on" ? "،" :"") + SpWa; // Add "و " and Option Comma
  }
}
return NumberInWords; // All done
//------------------------------------------------------------------
//    Core Function Converts 1 Triplet (1 to 999) to Arabic Words
//------------------------------------------------------------------
function oneTripletToWords(Scale) {
let Num_100  = ~~(Triplet/100),          // Hundreds (1 digit)
    Num_99   = Triplet % 100,            // 00 to 99
    Num_Unit = TableUnits[Num_99 % 10],  // 0 to 9 (string)
    Num_Tens = ~~(Num_99/10),            // Tens   (1 digit)
    Word_100 = "";                       // Holds words for Hundreds
// ---- If Feminine, use the Feminine tables only if Last Effective Triplet
if (Feminine ==="on" && IsLastEffTriplet)  {
   [TableUnits, Table11_19, Table11_19[0]] = [ [...TableFemale], [...TableFemale], TableMale[10] ],
   [Table11_19[1], Table11_19[2]         ] = ["إحدى" , "إثنتا"]; // Feminine starting words for 11 and 12
   if (Num_99 > 19) TableUnits[1]          = "إحدى";
   }
// ---- Do Hundreds (100 to 900)
Num_100 && (Word_100 = Num_100 > 2
   ? TableFemale[Num_100] + (SplitHund === "on" ? " " : "") + Miah      // 300-900
   : Num_100 === 1 ? Miah                                               // 100
     : Miah.slice(0,-1) + (Scale && !Num_99 || TextAfter ?"تا":"تان")); // For 200 Use either مئتا or مئتان
// ---- Do 0-99 and Join Join Hund, Tens, and Units
let Words999 = Word_100 + (Num_100 && Num_99 ? SpWa : "") +
    (Num_99 > 19                                                   // 20-99
    ? Num_Unit + (Num_Unit ? SpWa : "") +                          // Units و and
      (Num_Tens === 2 ? "عشر" : TableFemale[Num_Tens]) + "ون"      // Add Woon for 20's or 30's to 90's
    : Num_99 > 10 ? Table11_19[Num_99-10] + " " + Table11_19[0] :  // 11-19
      TableUnits[Num_99]);
// ---- Add Scale Name if applicable
if (Scale) {
   let Word_100Wa = (Num_100 ? Word_100 + SpWa :"") + Scale;  // Default Scale Name
   Words999 = Num_99 > 2
   ?  Words999 + (Num_99 < 11 ? " "+ TableScalesPlural[digits/3-1]: " "+Scale+"ًا") // For 3 to 99
   :  Num_99                                                                  // 0, 1, or 2
      ? Num_99 === 1 ? Word_100Wa                                             // 1
        : Word_100Wa + (IsLastEffTriplet && TextAfter === "on" ? "ا" : "ان")  // For 2 اثنا or اثنان
      :   Words999 + " " + Scale;                                             // 0
   }
return Words999; //Return the Triple in Words with Scale Name
}
}
