using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanCar.Data
{
    public interface IBase
    {
        [Key]
        [Display(Name = "کلید")]
        [Required(ErrorMessage = "کلید را مشخص کنید")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int Id { get; set; }
        DateTimeOffset Created { get; set; }
    }

}
