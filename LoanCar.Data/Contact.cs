using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanCar.Data
{
    [Table("Contact", Schema = "fac")]
    public class Contact : Base
    {
        [Display(Name = "Name")]
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50, ErrorMessage = "Name can not be greater than {1} character")]
        public string Name { get; set; }

        [Display(Name = "Email")]
        [MaxLength(100, ErrorMessage = "Email can not be greater than {1} character")]
        public string Email { get; set; }

        [Display(Name = "Phone")]
        [MaxLength(50, ErrorMessage = "Phone can not be greater than {1} character")]
        public string Phone { get; set; }

        [Display(Name = "Message")]
        [Required(ErrorMessage = "Message is required")]
        [MaxLength(1000, ErrorMessage = "Message can not be greater than {1} character")]
        public string Message { get; set; }

    }
}
