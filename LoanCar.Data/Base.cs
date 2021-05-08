using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanCar.Data
{
    public abstract class Base : IBase
    {
        public Base()
        {
            this.Created = DateTimeOffset.Now;
        }    
        [Key]
        [Display(Name = "کلید")]
        [Required(ErrorMessage = "کلید را مشخص کنید")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}
