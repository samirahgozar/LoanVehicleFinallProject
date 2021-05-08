using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanCar.Data
{

    [Table("Loan", Schema = "fac")]
    public class Loan:Base
    {
        #region Personal
        [Display(Name = "Applicant First Name")]
        [Required(ErrorMessage = "Applicant First Name is required")]
        [MaxLength(20, ErrorMessage = "Applicant First Name can not be greater than {1} character")]
        public string ApplicantFirstName { get; set; }

        [Display(Name = "Applicant Last Name")]
        [Required(ErrorMessage = "Applicant Last Name is required")]
        [MaxLength(100, ErrorMessage = "Applicant Last Name can not be greater than {1} character")]
        public string ApplicantLastName { get; set; }

        [Display(Name = "Applicant Middle Name")]
        [MaxLength(50, ErrorMessage = "Applicant Middle Name can not be greater than {1} character")]
        public string ApplicantMiddleName { get; set; }

        [Display(Name = "Applicant Date Of Birth")]
        [Required(ErrorMessage = "applicant Date Of Birth is required")]
        public string ApplicantDateOfBirth  { get; set; }

        [Display(Name = "Applicant SIN")]
        [Required(ErrorMessage = "Applicant SIN is required")]
        [MaxLength(12, ErrorMessage = "ApplicantSIN can not be greater than {1} character")]
        public string ApplicantSIN { get; set; }

        [Display(Name = "Spouse First Name")]
        [MaxLength(20, ErrorMessage = "Spouse First Name can not be greater than {1} character")]
        public string SpouseFirstName { get; set; }

        [Display(Name = "Spouse Last Name")]
        [MaxLength(100, ErrorMessage = "Spouse Last Name can not be greater than {1} character")]
        public string SpouseLastName { get; set; }

        [Display(Name = "Spouse Middle Name")]
        [MaxLength(50, ErrorMessage = "Spouse Middle Name can not be greater than {1} character")]
        public string SpouseMiddleName { get; set; }

        [Display(Name = "Spouse Date Of Birth")]
        public string SpouseDateOfBirth { get; set; }

        [Display(Name = "Spouse SIN")]
        [MaxLength(12, ErrorMessage = "SpouseSIN can not be greater than {1} character")]
        public string SpouseSIN { get; set; }

        [Display(Name = "Applicant Phone")]
        [Required(ErrorMessage = "Applicant Phone is required")]
        [MaxLength(15, ErrorMessage = "Applicant Phone can not be greater than {1} character")]
        public string ApplicantPhone { get; set; }

        [Display(Name = "CpApplicant Phone")]
        [MaxLength(15, ErrorMessage = "CpApplicant Phone can not be greater than {1} character")]
        public string CpApplicantPhone { get; set; }

        [Display(Name = "Marital Status")]
        public string MaritalStatus { get; set; }

        [Display(Name = "Driver Licence")]
        [MaxLength(12, ErrorMessage = "Driver Licence can not be greater than {1} character")]
        public string DriverLicence { get; set; }

        [Display(Name = "Exp Date")]
        public string ExpDate { get; set; }
        #endregion

        #region Address

        [Display(Name = "Applicant Address")]
        [Required(ErrorMessage = "Applicant Address is required")]
        [MaxLength(135, ErrorMessage = "Applicant Address can not be greater than {1} character")]
        public string ApplicantAddress { get; set; }

        [Display(Name = "Applicant City")]
        [Required(ErrorMessage = "Applicant City is required")]
        [MaxLength(15, ErrorMessage = "Applicant City can not be greater than {1} character")]
        public string ApplicantCity { get; set; }

        [Display(Name = "Applicant Province")]
        [Required(ErrorMessage = "Applicant Province is required")]
        [MaxLength(15, ErrorMessage = "Applicant Province can not be greater than {1} character")]
        public string ApplicantProvince { get; set; }

        [Display(Name = "Applicant Postal Code")]
        [Required(ErrorMessage = "Applicant Postal Code is required")]
        [MaxLength(7, ErrorMessage = "Applicant Postal Code must be {1} character")]
        [MinLength(7, ErrorMessage = "Applicant Postal Code must be {1} character")]
        public string ApplicantPostalCode { get; set; }

        [Display(Name = "Applicant HowLong Year")]
        [Range(0, 99)]
        public short ApplicantHowLongYear { get; set; } = 0;

        [Display(Name = "Applicant HowLong Month")]
        [Range(0, 11)]
        public short ApplicantHowLongMonth { get; set; } = 0;


        [Display(Name = "Previous Applicant Address")]
        [MaxLength(135, ErrorMessage = "Previous Applicant Address can not be greater than {1} character")]
        public string PreviousApplicantAddress { get; set; }

        [Display(Name = "Previous Applicant City")]
        [MaxLength(15, ErrorMessage = "Previous Applicant City can not be greater than {1} character")]
        public string PreviousApplicantCity { get; set; }

        [Display(Name = "Previous Applicant Province")]
        [MaxLength(15, ErrorMessage = "Previous Applicant Province can not be greater than {1} character")]
        public string PreviousApplicantProvince { get; set; }

        [Display(Name = "Previous Applicant Postal Code")]
        [MaxLength(7, ErrorMessage = "Previous Applicant Postal Code must be {1} character")]
        public string PreviousApplicantPostalCode { get; set; }

        [Display(Name = "Previous Applicant HowLong Year")]
        [Range(0, 99)]
        public short? PreviousApplicantHowLongYear { get; set; } = 0;

        [Display(Name = "Previous Applicant HowLong Month")]
        [Range(0, 11)]
        public short? PreviousApplicantHowLongMonth { get; set; } = 0;

        [Display(Name = "Own Status")]
        //[Required(ErrorMessage = "Own Status is required")]
        [MaxLength(4, ErrorMessage = "Own Status must be {1} character")]
        //[MinLength(4, ErrorMessage = "Own Status must be {1} character")]
        public string OwnStatus { get; set; }

        [Display(Name = "Market Value")]
        [MaxLength(20, ErrorMessage = "Market Value can not be greater than {1} character")]
        public string MarketValue { get; set; }

        [Display(Name = "Mortgage Holder")]
        [MaxLength(15, ErrorMessage = "Mortgage Holder must be {1} character")]
        public string MortgageHolder { get; set; }

        [Display(Name = "Mortgage Balance")]
        [MaxLength(20, ErrorMessage = "Mortgage Balance can not be greater than {1} character")]
        public string MortgageBalance { get; set; }

        [Display(Name = "Mortgage")]
        [MaxLength(20, ErrorMessage = "Mortgage can not be greater than {1} character")]
        public string Mortgage { get; set; }

        #endregion

        #region Employment

        [Display(Name = "Present Employer Name")]
        [Required(ErrorMessage = "Present Employer Name is required")]
        [MaxLength(20, ErrorMessage = "Present Employer Name can not be greater than {1} character")]
        public string PresentEmployerName { get; set; }

        [Display(Name = "Present Employer Occupation")]
        [Required(ErrorMessage = "Present Employer Occupation is required")]
        [MaxLength(30, ErrorMessage = "Present Employer Occupation can not be greater than {1} character")]
        public string PresentEmployerOccupation { get; set; }

        [Display(Name = "Present Employer HowLong Year")]
        [Range(0, 99)]
        public short PresentEmployerHowLongYear { get; set; } = 0;

        [Display(Name = "Present Employer HowLong Month")]
        [Range(0, 11)]
        public short PresentEmployerHowLongMonth { get; set; } = 0;

        [Display(Name = "Present Employer Address")]
        [MaxLength(135, ErrorMessage = "Present Employer Address can not be greater than {1} character")]
        public string PresentEmployerAddress { get; set; }

        [Display(Name = "Nature Business")]
        [MaxLength(40, ErrorMessage = "Nature Business can not be greater than {1} character")]
        public string NatureBusiness { get; set; }

        [Display(Name = "present Employer Phone")]
        [MaxLength(15, ErrorMessage = "Present Employer Phone can not be greater than {1} character")]
        public string PresentEmployerPhone { get; set; }

        [Display(Name = "present Employer Monthly Income")]
        [MaxLength(70, ErrorMessage = "Present Employer Monthly Income  can not be greater than {1} character")]
        public string PresentEmployerMonthlyIncome { get; set; }

        [Display(Name = "Present Employer TwoIncome")]
        [MaxLength(70, ErrorMessage = "Present Employer TwoIncome can not be greater than {1} character")]
        public string PresentEmployerTwoIncome { get; set; }

        [Display(Name = "Previous Employer Name")]
        [MaxLength(20, ErrorMessage = "Previous Employer Name can not be greater than {1} character")]
        public string PreviousEmployerName { get; set; }

        [Display(Name = "Previous Employer Phone")]
        [MaxLength(15, ErrorMessage = "Previous Employer Phone can not be greater than {1} character")]
        public string PreviousEmployerPhone { get; set; }

        [Display(Name = " Previous Employer HowLong Year")]
        [Range(0, 99)]
        public short? PreviousEmployerHowLongYear { get; set; } = 0;

        [Display(Name = " Previous Employer HowLong Month")]
        [Range(0, 11)]
        public short? PreviousEmployerHowLongMonth { get; set; } = 0;

        [Display(Name = "Applicant Employer Name")]
        [MaxLength(20, ErrorMessage = "Applicant Employer Name can not be greater than {1} character")]
        public string ApplicantEmployerName { get; set; }

        [Display(Name = "Applicant Employer Occupation")]
        [MaxLength(30, ErrorMessage = "Applicant Employer Occupation can not be greater than {1} character")]
        public string ApplicantEmployerOccupation { get; set; }

        [Display(Name = "Applicant Employer HowLong Year")]
        [Range(0, 99)]
        public short? ApplicantEmployerHowLongYear { get; set; } = 0;

        [Display(Name = "Applicant Employer HowLong Month")]
        [Range(0, 11)]
        public short? ApplicantEmployerHowLongMonth { get; set; } = 0;

        [Display(Name = "Applicant Employer Phone")]
        [MaxLength(30, ErrorMessage = "Applicant Employer Phone  can not be greater than {1} character")]
        public string ApplicantEmployerPhone { get; set; }

        [Display(Name = "Applicant Employer Monthly Income")]
        [MaxLength(70, ErrorMessage = "Applicant Employer Monthly Income  can not be greater than {1} character")]
        public string ApplicantEmployerMonthlyIncome { get; set; }

        [Display(Name = "Applicant Employer TwoIncome")]
        [MaxLength(70, ErrorMessage = "Applicant Employer TwoIncome can not be greater than {1} character")]
        public string ApplicantEmployerTwoIncome { get; set; }

        #endregion

        #region Vehicle
        [Display(Name = "Solid Vehicle Make")]
        [MaxLength(15, ErrorMessage = "Solid Vehicle Make can not be greater than {1} character")]
        public string SolidVehicleMake { get; set; }

        [Display(Name = "Solid Vehicle Model")]
        [MaxLength(15, ErrorMessage = "Solid Vehicle Model can not be greater than {1} character")]
        public string SolidVehicleModel { get; set; }

        [Display(Name = "Solid Vehicle Year")]
        [Range(1980, 7000)]
        public int? SolidVehicleYear { get; set; }

        [Display(Name = "Solid Vehicle Kms")]
        [Range(0, 100000)]
        public long? SolidVehicleKms { get; set; }

        [Display(Name = "Solid Vehicle VIN")]
        [MaxLength(17, ErrorMessage = "Solid Vehicle VIN can not be greater than {1} character")]
        public string SolidVehicleVin { get; set; }

        [Display(Name = "Solid Vehicle Damage")]
        public bool SolidVehicleDamage { get; set; }

        [Display(Name = "Solid Vehicle Rebuilt")]
        public bool SolidVehicleRebuilt { get; set; }

        [Display(Name = "Solid Vehicle Out")]
        public bool SolidVehicleOut { get; set; }

        [Display(Name = "Trade Vehicle Make")]
        [MaxLength(15, ErrorMessage = "Trade Vehicle Make can not be greater than {1} character")]
        public string TradeVehicleMake { get; set; }

        [Display(Name = "Trade Vehicle Model")]
        [MaxLength(15, ErrorMessage = "Trade Vehicle Model can not be greater than {1} character")]
        public string TradeVehicleModel { get; set; }

        [Display(Name = "Trade Vehicle Year")]
        [Range(1980, 7000)]
        public int? TradeVehicleYear { get; set; }

        [Display(Name = "Trade Vehicle Kms")]
        [Range(0, 100000)]
        public long? TradeVehicleKms { get; set; }

        [Display(Name = "Trade Vehicle VIN")]
        [MaxLength(17, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string TradeVehicleVin { get; set; }

        [Display(Name = "Trade Vehicle Damage")]
        public bool TradeVehicleDamage { get; set; }

        [Display(Name = "Trade Vehicle Rebuilt")]
        public bool TradeVehicleRebuilt { get; set; }

        [Display(Name = "Trade Vehicle Out")]
        public bool TradeVehicleOut { get; set; }

        [Display(Name = "Price")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string Price { get; set; }

        [Display(Name = "DocFEE")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string DocFEE { get; set; }

        [Display(Name = "Trade")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string Trade { get; set; }

        [Display(Name = "Difference")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string Difference { get; set; }

        [Display(Name = "DownPMT")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string DownPMT { get; set; }

        [Display(Name = "BalanceOwing")]
        [MaxLength(20, ErrorMessage = "Trade Vehicle VIN can not be greater than {1} character")]
        public string BalanceOwing { get; set; }

        #endregion
    }
}
