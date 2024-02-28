namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(CarItemOrdered itemOrdered, decimal price, int rentDays)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            RentDays = rentDays;
        }

        public CarItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int RentDays { get; set; }
    }
}