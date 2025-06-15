import MenuItem from "./MenuItem";

const MealSection = ({ title, items, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="bg-[#ede0d4] px-6 py-4 flex items-center">
        {icon}
        <h3 className="text-xl font-semibold text-[#7f5539] ml-3">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {items.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MealSection;