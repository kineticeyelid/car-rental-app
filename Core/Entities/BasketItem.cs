namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string CarName { get; set; }
        public decimal RentalPrice { get; set; }
        public int RentDays { get; set; }
        public string PictureUrl { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
    }
}
