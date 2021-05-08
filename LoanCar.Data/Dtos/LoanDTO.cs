using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanCar.Data
{
    public class LoanDTO 
    {
        public int Id { get; set; }
        public DateTimeOffset Created { get; set; }

        #region Personal
        [Display(Name = "Applicant First Name")]
        public string ApplicantFirstName { get; set; }

        [Display(Name = "Applicant Last Name")]
        public string ApplicantLastName { get; set; }

        [Display(Name = "Applicant Middle Name")]
        public string ApplicantMiddleName { get; set; }

        [Display(Name = "Applicant Date Of Birth")]
        public string ApplicantDateOfBirth { get; set; }

        [Display(Name = "Applicant SIN")]
        public string ApplicantSIN { get; set; }

        [Display(Name = "Spouse First Name")]
        public string SpouseFirstName { get; set; }

        [Display(Name = "Spouse Last Name")]
        public string SpouseLastName { get; set; }

        [Display(Name = "Spouse Middle Name")]
        public string SpouseMiddleName { get; set; }

        [Display(Name = "Spouse Date Of Birth")]
        public string SpouseDateOfBirth { get; set; }

        [Display(Name = "Spouse SIN")]
        public string SpouseSIN { get; set; }

        [Display(Name = "Applicant Phone")]
        public string ApplicantPhone { get; set; }

        [Display(Name = "CpApplicant Phone")]
        public string CpApplicantPhone { get; set; }

        [Display(Name = "Marital Status")]
        public string MaritalStatus { get; set; }

        [Display(Name = "Driver Licence")]
        public string DriverLicence { get; set; }

        [Display(Name = "Exp Date")]
        public string ExpDate { get; set; }
        #endregion

        #region Address

        [Display(Name = "Applicant Address")]
        public string ApplicantAddress { get; set; }

        [Display(Name = "Applicant City")]
        public string ApplicantCity { get; set; }

        [Display(Name = "Applicant Province")]
        public string ApplicantProvince { get; set; }

        [Display(Name = "Applicant Postal Code")]
        public string ApplicantPostalCode { get; set; }

        [Display(Name = "Applicant HowLong Year")]
        public short ApplicantHowLongYear { get; set; }

        [Display(Name = "Applicant HowLong Month")]
        public short ApplicantHowLongMonth { get; set; }


        [Display(Name = "Previous Applicant Address")]
        public string PreviousApplicantAddress { get; set; }

        [Display(Name = "Previous Applicant City")]
        public string PreviousApplicantCity { get; set; }

        [Display(Name = "Previous Applicant Province")]
        public string PreviousApplicantProvince { get; set; }

        [Display(Name = "Previous Applicant Postal Code")]
        public string PreviousApplicantPostalCode { get; set; }

        [Display(Name = "Previous Applicant HowLong Year")]
        public short? PreviousApplicantHowLongYear { get; set; }

        [Display(Name = "Previous Applicant HowLong Month")]
        public short? PreviousApplicantHowLongMonth { get; set; }

        [Display(Name = "Own Status")]
        public string OwnStatus { get; set; }

        [Display(Name = "Market Value")]
        public string MarketValue { get; set; }

        [Display(Name = "Mortgage Holder")]
        public string MortgageHolder { get; set; }

        [Display(Name = "Mortgage Balance")]
        public string MortgageBalance { get; set; }

        [Display(Name = "Mortgage")]
        public string Mortgage { get; set; }

        #endregion

        #region Employment

        [Display(Name = "Present Employer Name")]
        public string PresentEmployerName { get; set; }

        [Display(Name = "Present Employer Occupation")]
        public string PresentEmployerOccupation { get; set; }

        [Display(Name = "Present Employer HowLong Year")]
        public short PresentEmployerHowLongYear { get; set; }

        [Display(Name = "Present Employer HowLong Month")]
        public short PresentEmployerHowLongMonth { get; set; }

        [Display(Name = "Present Employer Address")]
        public string PresentEmployerAddress { get; set; }

        [Display(Name = "Nature Business")]
        public string NatureBusiness { get; set; }

        [Display(Name = "present Employer Phone")]
        public string PresentEmployerPhone { get; set; }

        [Display(Name = "present Employer Monthly Income")]
        public long PresentEmployerMonthlyIncome { get; set; }

        [Display(Name = "Present Employer TwoIncome")]
        public string PresentEmployerTwoIncome { get; set; }

        [Display(Name = "Previous Employer Name")]
        public string PreviousEmployerName { get; set; }

        [Display(Name = "Previous Employer Phone")]
        public string PreviousEmployerPhone { get; set; }

        [Display(Name = " Previous Employer HowLong Year")]
        public short? PreviousEmployerHowLongYear { get; set; }

        [Display(Name = " Previous Employer HowLong Month")]
        public short? PreviousEmployerHowLongMonth { get; set; }

        [Display(Name = "Applicant Employer Name")]
        public string ApplicantEmployerName { get; set; }

        [Display(Name = "Applicant Employer Occupation")]
        public string ApplicantEmployerOccupation { get; set; }

        [Display(Name = "Applicant Employer HowLong Year")]
        public short? ApplicantEmployerHowLongYear { get; set; }

        [Display(Name = "Applicant Employer HowLong Month")]
        public short? ApplicantEmployerHowLongMonth { get; set; } 

        [Display(Name = "Applicant Employer Phone")]
        public string ApplicantEmployerPhone { get; set; }

        [Display(Name = "Applicant Employer Monthly Income")]
        public long? ApplicantEmployerMonthlyIncome { get; set; }

        [Display(Name = "Applicant Employer TwoIncome")]
        public string ApplicantEmployerTwoIncome { get; set; }

        #endregion

        #region Vehicle
        [Display(Name = "Solid Vehicle Make")]
        public string SolidVehicleMake { get; set; }

        [Display(Name = "Solid Vehicle Model")]
        public string SolidVehicleModel { get; set; }

        [Display(Name = "Solid Vehicle Year")]
        public int? SolidVehicleYear { get; set; }

        [Display(Name = "Solid Vehicle Kms")]
        public long? SolidVehicleKms { get; set; }

        [Display(Name = "Solid Vehicle VIN")]
        public string SolidVehicleVin { get; set; }

        [Display(Name = "Solid Vehicle Damage")]
        public bool SolidVehicleDamage { get; set; }

        [Display(Name = "Solid Vehicle Rebuilt")]
        public bool SolidVehicleRebuilt { get; set; }

        [Display(Name = "Solid Vehicle Out")]
        public bool SolidVehicleOut { get; set; }

        [Display(Name = "Trade Vehicle Make")]
        public string TradeVehicleMake { get; set; }

        [Display(Name = "Trade Vehicle Model")]
        public string TradeVehicleModel { get; set; }

        [Display(Name = "Trade Vehicle Year")]
        public int? TradeVehicleYear { get; set; }

        [Display(Name = "Trade Vehicle Kms")]
        public long? TradeVehicleKms { get; set; }

        [Display(Name = "Trade Vehicle VIN")]
        public string TradeVehicleVin { get; set; }

        [Display(Name = "Trade Vehicle Damage")]
        public bool TradeVehicleDamage { get; set; }

        [Display(Name = "Trade Vehicle Rebuilt")]
        public bool TradeVehicleRebuilt { get; set; }

        [Display(Name = "Trade Vehicle Out")]
        public bool TradeVehicleOut { get; set; }

        [Display(Name = "Price")]
        public string Price { get; set; }

        [Display(Name = "DocFEE")]
        public string DocFEE { get; set; }

        [Display(Name = "Trade")]
        public string Trade { get; set; }

        [Display(Name = "Difference")]
        public string Difference { get; set; }

        [Display(Name = "DownPMT")]
        public string DownPMT { get; set; }

        [Display(Name = "BalanceOwing")]
        public string BalanceOwing { get; set; }

        #endregion
    }
}