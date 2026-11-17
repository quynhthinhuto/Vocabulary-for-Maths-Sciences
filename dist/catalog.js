// Themed vocabulary sequences. Topics recur within a grade band for spiral review.
// Grade-specific foundations retain all v1 word IDs and stored learning history.
const TOPIC_BANK = {};
function topic(key,title,en,rows){
  TOPIC_BANK[key]={key,title,en,entries:rows.trim().split('\n').map(line=>{const [en,vi,example]=line.split('|');return {en,vi,example};})};
}
topic('m-a-number','Những con số quanh em','Numbers',`
zero|số không|Zero means there are none.
one|số một|I have one pencil.
two|số hai|A bicycle has two wheels.
three|số ba|A triangle has three sides.
ten|số mười|I have ten fingers.
twenty|số hai mươi|Ten plus ten equals twenty.`);
topic('m-a-operation','Cộng và trừ','Adding and subtracting',`
plus|cộng; dấu cộng|Two plus three equals five.
minus|trừ; dấu trừ|Five minus two equals three.
equals|bằng|One plus one equals two.
sum|tổng|The sum of two and three is five.
total|tổng số|There are six apples in total.
difference|hiệu|The difference between seven and four is three.`);
topic('m-a-shape','Thế giới hình dạng','Shapes',`
square|hình vuông|A square has four equal sides.
triangle|hình tam giác|A triangle has three sides.
oval|hình bầu dục|This mirror is shaped like an oval.
side|cạnh|Each side of a square has the same length.
corner|góc; đỉnh|A square has four corners.
straight line|đường thẳng|Use a ruler to draw a straight line.`);
topic('m-a-measure','So sánh và đo lường','Measuring',`
long|dài|This pencil is long.
short|ngắn|This ruler is short.
heavy|nặng|The big bag is heavy.
light|nhẹ|The empty box is light.
centimetre|xentimét|A centimetre is a unit of length.
ruler|thước kẻ|Use a ruler to measure the pencil.`);
topic('m-a-time','Thời gian mỗi ngày','Time',`
clock|đồng hồ|The clock shows the time.
hour|giờ|One hour has sixty minutes.
minute|phút|One minute has sixty seconds.
day|ngày|A day has twenty-four hours.
week|tuần|A week has seven days.
calendar|lịch|A calendar shows the days of a month.`);
topic('m-b-operation','Phép tính và quy luật','Operations',`
product|tích|The product of three and four is twelve.
quotient|thương|The quotient of twelve divided by three is four.
remainder|số dư|Seven divided by three has a remainder of one.
multiple|bội số|Twelve is a multiple of three.
even number|số chẵn|Eight is an even number.
odd number|số lẻ|Seven is an odd number.`);
topic('m-b-fraction','Phân số và số thập phân','Fractions and decimals',`
half|một nửa|One half of eight is four.
quarter|một phần tư|One quarter of twelve is three.
equivalent fractions|các phân số bằng nhau|One half and two quarters are equivalent fractions.
decimal point|dấu thập phân|In English, a decimal point separates whole and fractional parts.
tenth|một phần mười|One tenth is written as 0.1.
hundredth|một phần trăm|One hundredth is written as 0.01.`);
topic('m-b-geometry','Hình học quanh ta','Geometry',`
vertex|đỉnh|A triangle has a vertex at each corner.
edge|cạnh của khối|A cube has twelve edges.
face|mặt của khối|A cube has six square faces.
cube|hình lập phương|A cube has six equal square faces.
cuboid|hình hộp chữ nhật|A cuboid has six rectangular faces.
right angle|góc vuông|A right angle measures ninety degrees.`);
topic('m-b-measure','Độ dài, diện tích, thể tích','Units of measurement',`
area|diện tích|Area measures the size of a flat surface.
square metre|mét vuông|A square metre is a unit of area.
litre|lít|A litre is a unit of volume.
kilogram|kilôgam|A kilogram is a unit of mass.
distance|khoảng cách|Measure the distance between the two points.
height|chiều cao|Measure the height from the base to the top.`);
topic('m-b-data','Đọc số liệu và biểu đồ','Data and charts',`
table|bảng số liệu|A table can organize numbers.
bar chart|biểu đồ cột|A bar chart compares amounts using bars.
average|giá trị trung bình|The average of two, four, and six is four.
pattern|quy luật|Two, four, six, eight follow a pattern.
row|hàng|Read the numbers across the first row.
column|cột|Read the numbers down the first column.`);
topic('m-c-number','Số và lũy thừa','Numbers and powers',`
positive number|số dương|Five is a positive number.
negative number|số âm|Negative three is a negative number.
absolute value|giá trị tuyệt đối|The absolute value of negative five is five.
exponent|số mũ|In two cubed, the exponent is three.
power|lũy thừa|Two to the third power equals eight.
divisibility|tính chia hết|Divisibility by two depends on the final digit.`);
topic('m-c-ratio','Tỉ số và đại lượng','Ratios and quantities',`
unit rate|tỉ số tính trên một đơn vị|Price per kilogram is a unit rate.
direct proportion|tỉ lệ thuận|At a fixed price, cost is in direct proportion to quantity.
inverse proportion|tỉ lệ nghịch|For a fixed distance, time is in inverse proportion to speed.
scale|tỉ lệ bản đồ; tỉ lệ bản vẽ|The map scale relates map distance to real distance.
percent|phần trăm|Twenty-five percent equals one quarter.
quantity|đại lượng; số lượng|Length is a measurable quantity.`);
topic('m-c-angle','Đường thẳng và góc','Lines and angles',`
ray|tia|A ray starts at one point and extends in one direction.
line segment|đoạn thẳng|A line segment has two endpoints.
midpoint|trung điểm|The midpoint divides a segment into equal parts.
acute angle|góc nhọn|An acute angle is less than ninety degrees.
obtuse angle|góc tù|An obtuse angle is between ninety and one hundred eighty degrees.
angle bisector|tia phân giác|An angle bisector divides an angle into two equal angles.`);
topic('m-c-shape','Tam giác và đối xứng','Triangles and symmetry',`
equilateral triangle|tam giác đều|An equilateral triangle has three equal sides.
isosceles triangle|tam giác cân|An isosceles triangle has at least two equal sides.
right triangle|tam giác vuông|A right triangle contains a right angle.
congruent|bằng nhau về hình dạng và kích thước|Congruent triangles have matching equal sides and angles.
axis of symmetry|trục đối xứng|A square has four axes of symmetry.
rotation|phép quay|A rotation turns a shape around a point.`);
topic('m-c-chance','Dữ liệu và khả năng xảy ra','Data and chance',`
sample|mẫu dữ liệu|A sample is part of a larger group.
survey|cuộc khảo sát|A survey collects answers to questions.
frequency|tần số xuất hiện|Frequency tells us how often a value appears.
outcome|kết quả có thể xảy ra|Heads is one possible outcome of a coin toss.
event|biến cố|Rolling an even number is an event.
random|ngẫu nhiên|A random choice is made by chance.`);
topic('m-d-algebra','Ngôn ngữ đại số','Algebra',`
variable|biến số|A variable can represent an unknown number.
coefficient|hệ số|In three x, the coefficient of x is three.
constant|hằng số|A constant has a fixed value.
term|hạng tử|The expression has two terms.
expression|biểu thức|Two x plus one is an algebraic expression.
factorisation|phân tích thành nhân tử|Factorisation rewrites an expression as a product.`);
topic('m-d-equation','Phương trình và bất phương trình','Equations',`
solution|nghiệm|A solution makes an equation true.
unknown|ẩn số|Find the value of the unknown.
inequality|bất phương trình; bất đẳng thức|An inequality compares two expressions.
system of equations|hệ phương trình|A system of equations has equations to solve together.
substitution|phép thế|Use substitution to replace a variable with an expression.
discriminant|biệt thức|The discriminant helps determine the real roots of a quadratic equation.`);
topic('m-d-geometry','Các hình và định lý','Geometric reasoning',`
parallelogram|hình bình hành|Opposite sides of a parallelogram are parallel.
rhombus|hình thoi|A rhombus has four equal sides.
trapezium|hình thang|A trapezium has a pair of parallel sides.
diagonal|đường chéo|A diagonal joins two non-adjacent vertices.
similar triangles|tam giác đồng dạng|Similar triangles have equal corresponding angles.
Pythagorean theorem|định lý Pythagore|The Pythagorean theorem relates the sides of a right triangle.`);
topic('m-d-circle','Khám phá đường tròn','Circles',`
radius|bán kính|A radius joins the centre of a circle to its edge.
diameter|đường kính|The diameter is twice the radius.
chord|dây cung|A chord joins two points on a circle.
arc|cung tròn|An arc is part of a circle's circumference.
central angle|góc ở tâm|A central angle has its vertex at the centre.
inscribed angle|góc nội tiếp|An inscribed angle has its vertex on the circle.`);
topic('m-d-graph','Đồ thị và phân tích số liệu','Graphs',`
coordinate plane|mặt phẳng tọa độ|A coordinate plane has two perpendicular axes.
horizontal axis|trục hoành|The horizontal axis is usually the x-axis.
vertical axis|trục tung|The vertical axis is usually the y-axis.
origin|gốc tọa độ|The origin has coordinates zero, zero.
slope|hệ số góc|Slope describes the steepness of a line.
median|trung vị|The median is the middle value in ordered data.`);
topic('m-e-function','Hàm số và lượng giác','Functions and trigonometry',`
domain|tập xác định|The domain contains the allowed inputs of a function.
range|tập giá trị|The range contains the outputs of a function.
sine|sin|In a right triangle, sine is opposite over hypotenuse.
cosine|cosin|In a right triangle, cosine is adjacent over hypotenuse.
period|chu kỳ|The sine function has a period of two pi.
amplitude|biên độ|The amplitude of y equals two sine x is two.`);
topic('m-e-calculus','Từ vựng giải tích','Calculus',`
continuity|tính liên tục|Continuity means a function has no break at the point considered.
rate of change|tốc độ biến thiên|A derivative gives an instantaneous rate of change.
critical point|điểm tới hạn|A critical point can occur where a derivative is zero.
maximum|giá trị cực đại; giá trị lớn nhất|A maximum is a highest value in the stated context.
minimum|giá trị cực tiểu; giá trị nhỏ nhất|A minimum is a lowest value in the stated context.
definite integral|tích phân xác định|A definite integral accumulates signed area over an interval.`);
topic('m-e-space','Hình học trong không gian','Geometry in space',`
plane|mặt phẳng|A plane is a flat surface that extends without end.
normal vector|vectơ pháp tuyến|A normal vector is perpendicular to a plane.
sphere|mặt cầu|All points on a sphere are equally far from its centre.
cylinder|hình trụ|A cylinder has two parallel circular bases.
cone|hình nón|A cone has a circular base and one vertex.
pyramid|hình chóp|A pyramid has triangular faces meeting at a vertex.`);
topic('m-e-probability','Xác suất và tổ hợp','Probability and counting',`
permutation|hoán vị|A permutation is an ordered arrangement.
combination|tổ hợp|A combination is a selection where order does not matter.
conditional probability|xác suất có điều kiện|Conditional probability uses information about another event.
independent events|các biến cố độc lập|Independent events do not change each other's probability.
sample space|không gian mẫu|The sample space contains all possible outcomes.
expected value|giá trị kỳ vọng|Expected value is a probability-weighted average.`);
topic('m-e-statistics','Thống kê và mô hình','Statistics',`
variance|phương sai|Variance measures the average squared deviation from the mean.
quartile|tứ phân vị|Quartiles divide ordered data into four parts.
interquartile range|khoảng tứ phân vị|The interquartile range is the third quartile minus the first.
outlier|giá trị ngoại lệ|An outlier lies unusually far from other data values.
histogram|biểu đồ tần số dạng cột liền|A histogram shows frequencies for numerical intervals.
regression|hồi quy|Regression models a relationship between variables.`);
topic('s-a-body','Cơ thể và giác quan','Our bodies',`
eye|mắt|We use our eyes to see.
ear|tai|We use our ears to hear.
nose|mũi|We use our noses to smell.
skin|da|Our skin helps us feel touch.
sense|giác quan|Sight is one of our senses.
body|cơ thể|Our body has many parts.`);
topic('s-a-animal','Bạn bè động vật','Animals',`
bird|chim|A bird has feathers.
fish|cá|Most fish use gills to breathe.
insect|côn trùng|An insect has six legs.
wing|cánh|A butterfly has wings.
fur|lông thú|A cat has fur.
nest|tổ chim|A bird may lay eggs in a nest.`);
topic('s-a-plant','Một hạt giống lớn lên','Plants',`
flower|hoa|A flower can produce seeds.
stem|thân cây|The stem supports the plant.
fruit|quả|A fruit can contain seeds.
seedling|cây con|A seedling is a young plant.
sunlight|ánh sáng Mặt Trời|Plants use sunlight to make food.
grow|lớn lên; phát triển|Plants grow when their needs are met.`);
topic('s-a-weather','Quan sát thời tiết','Weather',`
cloud|mây|A cloud contains tiny water droplets or ice crystals.
rain|mưa|Rain falls from clouds.
wind|gió|Wind is moving air.
warm|ấm|The air feels warm today.
cold|lạnh|Ice feels cold.
season|mùa|A season is a part of the year.`);
topic('s-a-material','Vật liệu và đồ vật','Materials',`
wood|gỗ|A wooden chair is made of wood.
glass|thủy tinh|A window can be made of glass.
metal|kim loại|A metal spoon can feel cold.
plastic|nhựa|This toy is made of plastic.
soft|mềm|A cotton ball is soft.
hard|cứng|A stone is hard.`);
topic('s-b-living','Sự sống và môi trường','Living things',`
mammal|động vật có vú|A mammal feeds its young with milk.
reptile|bò sát|A snake is a reptile.
amphibian|lưỡng cư|A frog is an amphibian.
predator|động vật săn mồi|A predator hunts other animals for food.
prey|con mồi|A rabbit can be prey for a fox.
adaptation|đặc điểm thích nghi|Thick fur can be an adaptation to cold weather.`);
topic('s-b-water','Nước và sự biến đổi','Water and changes',`
melting|sự nóng chảy|Melting changes ice into liquid water.
freezing|sự đông đặc|Freezing changes liquid water into ice.
condensation|sự ngưng tụ|Condensation forms water droplets on a cold surface.
water vapour|hơi nước|Water vapour is water in the gas state.
water cycle|vòng tuần hoàn của nước|The water cycle moves water around Earth.
precipitation|giáng thủy|Rain and snow are forms of precipitation.`);
topic('s-b-light','Ánh sáng và âm thanh','Light and sound',`
light source|nguồn sáng|The sun is a light source.
shadow|bóng tối của vật|A shadow forms when an object blocks light.
transparent|trong suốt|Clear glass is transparent.
opaque|không trong suốt|An opaque material blocks light.
vibration|sự rung động|A vibration can produce sound.
sound|âm thanh|Sound travels through matter.`);
topic('s-b-space','Trái Đất và vũ trụ','Earth and space',`
Earth|Trái Đất|Earth travels around the sun.
moon|Mặt Trăng|The moon travels around Earth.
star|ngôi sao|The sun is a star.
orbit|quỹ đạo|Earth follows an orbit around the sun.
rotation|sự tự quay|Earth's rotation causes day and night.
atmosphere|khí quyển|The atmosphere is the layer of gases around Earth.`);
topic('s-b-environment','Chăm sóc hành tinh','Our environment',`
pollution|sự ô nhiễm|Pollution can harm living things.
recycle|tái chế|We can recycle some paper and plastic.
waste|chất thải|Put waste in the correct bin.
conservation|sự bảo tồn|Conservation helps protect nature.
resource|tài nguyên|Water is a natural resource.
clean energy|năng lượng sạch|Solar power is often described as clean energy.`);
topic('s-c-cell','Tế bào và sinh vật','Cells and organisms',`
cell wall|thành tế bào|A plant cell has a cell wall.
cell membrane|màng tế bào|A cell membrane controls movement into and out of the cell.
cytoplasm|tế bào chất|Many cell processes happen in the cytoplasm.
nucleus|nhân tế bào|The nucleus contains most of a eukaryotic cell's DNA.
classification|sự phân loại|Classification organizes organisms into groups.
species|loài|A species is a group of closely related organisms.`);
topic('s-c-energy','Năng lượng và chuyển động','Energy and motion',`
motion|chuyển động|Motion is a change in position over time.
speed|tốc độ|Speed is distance travelled per unit time.
force|lực|A force is a push or a pull.
gravity|lực hấp dẫn|Gravity pulls objects toward Earth.
heat|nhiệt lượng truyền|Heat is energy transferred because of a temperature difference.
conductor|vật dẫn|Copper is a good electrical conductor.`);
topic('s-c-matter','Các chất quanh ta','Matter',`
substance|chất|A pure substance has a fixed composition.
solution|dung dịch|Salt water is a solution.
solvent|dung môi|Water is the solvent in salt water.
solute|chất tan|Salt is the solute in salt water.
separation|sự tách chất|Filtration is a method of separation.
filtration|sự lọc|Filtration can separate sand from water.`);
topic('s-c-ecology','Các mối liên hệ trong tự nhiên','Ecosystems',`
producer|sinh vật sản xuất|A green plant is a producer in a food chain.
consumer|sinh vật tiêu thụ|An animal is a consumer in a food chain.
decomposer|sinh vật phân giải|Many fungi act as decomposers.
food web|lưới thức ăn|A food web links several food chains.
population|quần thể|A population contains one species in an area.
community|quần xã|A community contains populations of different species.`);
topic('s-c-lab','Tập làm nhà khoa học','Science skills',`
observation|sự quan sát|An observation uses evidence from the senses or instruments.
experiment|thí nghiệm|An experiment tests an idea under controlled conditions.
hypothesis|giả thuyết|A hypothesis is a testable explanation.
evidence|bằng chứng|Evidence helps us evaluate an explanation.
thermometer|nhiệt kế|A thermometer measures temperature.
microscope|kính hiển vi|A microscope helps us see small details.`);
topic('p-a-motion','Lực và chuyển động','Forces and motion',`
mass|khối lượng|Mass measures the amount of matter in an object.
weight|trọng lực; độ lớn trọng lực|Weight is the gravitational force on an object.
balanced forces|các lực cân bằng|Balanced forces produce zero net force.
inertia|quán tính|Inertia resists a change in motion.
speed|tốc độ|Speed is distance travelled per unit time.
displacement|độ dịch chuyển|Displacement describes the change from start to end position.`);
topic('p-a-fluid','Chất lỏng và áp suất','Fluids',`
density|khối lượng riêng|Density is mass per unit volume.
buoyancy|sự nổi; lực đẩy nổi|Buoyancy produces an upward force in a fluid.
upthrust|lực đẩy hướng lên|Upthrust can balance the weight of a floating object.
fluid|chất lưu|A fluid can flow.
atmospheric pressure|áp suất khí quyển|Atmospheric pressure is caused by the air around us.
hydraulic system|hệ thống thủy lực|A hydraulic system transmits force using a liquid.`);
topic('p-a-heat','Nhiệt và sự truyền năng lượng','Thermal energy',`
conduction|sự dẫn nhiệt|Conduction transfers energy through contact within or between materials.
convection|sự đối lưu|Convection transfers energy through the movement of a fluid.
thermal radiation|bức xạ nhiệt|Thermal radiation can travel through a vacuum.
thermal expansion|sự nở vì nhiệt|Thermal expansion makes many materials larger when heated.
specific heat capacity|nhiệt dung riêng|Specific heat capacity relates energy to mass and temperature change.
thermal equilibrium|cân bằng nhiệt|Objects in thermal equilibrium have the same temperature.`);
topic('p-a-circuit','Lắp ghép ngôn ngữ mạch điện','Electric circuits',`
ammeter|ampe kế|An ammeter measures electric current.
voltmeter|vôn kế|A voltmeter measures potential difference.
resistor|điện trở; linh kiện điện trở|A resistor limits current in a circuit.
series circuit|mạch nối tiếp|A series circuit has a single path for current.
parallel circuit|mạch song song|A parallel circuit has branches for current.
switch|công tắc|A switch can open or close a circuit.`);
topic('p-a-light','Ánh sáng và âm thanh','Light and sound',`
reflection|sự phản xạ|Reflection occurs when light bounces off a surface.
refraction|sự khúc xạ|Refraction can change light's direction as it enters another medium.
lens|thấu kính|A lens refracts light to form an image.
focal point|tiêu điểm|Parallel rays meet at the focal point of an ideal converging lens.
echo|tiếng vang|An echo is a reflected sound.
pitch|độ cao của âm|Pitch is related to sound frequency.`);
topic('p-b-mechanics','Chuyển động và bảo toàn','Mechanics',`
net force|hợp lực|Net force is the vector sum of all forces on an object.
work|công|Work is done when a force transfers energy through displacement.
power|công suất|Power is the rate of energy transfer.
potential energy|thế năng|A raised object has gravitational potential energy.
impulse|xung lượng|Impulse equals the change in momentum.
conservation of energy|sự bảo toàn năng lượng|Conservation of energy means total energy is not created or destroyed.`);
topic('p-b-waves','Dao động và sóng','Waves',`
amplitude|biên độ|Amplitude is the maximum displacement from equilibrium.
period|chu kỳ|A period is the time for one complete cycle.
resonance|sự cộng hưởng|Resonance can produce a large response near a natural frequency.
diffraction|sự nhiễu xạ|Diffraction spreads waves around edges and through openings.
standing wave|sóng dừng|A standing wave has fixed nodes.
transverse wave|sóng ngang|In a transverse wave, oscillation is perpendicular to wave travel.`);
topic('p-b-field','Điện trường và từ trường','Fields',`
electric field|điện trường|An electric field exerts a force on an electric charge.
electric potential|điện thế|Electric potential is potential energy per unit charge.
magnetic field|từ trường|A magnetic field can exert a force on a moving charge.
magnetic flux|từ thông|Magnetic flux measures the magnetic field passing through a surface.
electromagnetic induction|cảm ứng điện từ|Electromagnetic induction can generate an emf from changing magnetic flux.
capacitor|tụ điện|A capacitor stores separated electric charge and electrical energy.`);
topic('p-b-modern','Nguyên tử và hạt nhân','Modern physics',`
isotope|đồng vị|Isotopes have the same proton number but different neutron numbers.
proton|proton|A proton has a positive electric charge.
neutron|neutron|A neutron has no net electric charge.
nuclear fission|sự phân hạch|Nuclear fission splits a heavy nucleus.
nuclear fusion|sự nhiệt hạch; tổng hợp hạt nhân|Nuclear fusion joins light nuclei.
photoelectric effect|hiệu ứng quang điện|The photoelectric effect can release electrons from a surface illuminated by light.`);
topic('p-b-ac','Dòng điện và ứng dụng','Electrical applications',`
alternating current|dòng điện xoay chiều|Alternating current reverses direction periodically.
direct current|dòng điện một chiều|Direct current flows in one direction.
transformer|máy biến áp|A transformer changes alternating voltage using electromagnetic induction.
generator|máy phát điện|A generator converts mechanical energy into electrical energy.
semiconductor|chất bán dẫn|A semiconductor has electrical properties that can be controlled.
electromagnetic wave|sóng điện từ|An electromagnetic wave can travel through a vacuum.`);
topic('c-a-matter','Chất và cấu tạo chất','Matter and particles',`
particle|hạt|Matter can be described using particles.
compound|hợp chất|A compound contains chemically bonded atoms of different elements.
chemical formula|công thức hóa học|A chemical formula shows the elements in a substance.
chemical symbol|ký hiệu hóa học|O is the chemical symbol for oxygen.
pure substance|chất tinh khiết|A pure substance has a fixed composition.
physical change|biến đổi vật lý|Melting ice is a physical change.`);
topic('c-a-reaction','Đọc một phản ứng hóa học','Chemical reactions',`
reactant|chất phản ứng|A reactant is consumed in a chemical reaction.
product|sản phẩm phản ứng|A product forms in a chemical reaction.
chemical equation|phương trình hóa học|A chemical equation represents a chemical reaction.
coefficient|hệ số trong phương trình|A coefficient helps balance a chemical equation.
conservation of mass|sự bảo toàn khối lượng|Conservation of mass applies to a closed chemical system.
precipitate|chất kết tủa|A precipitate is a solid formed from a solution.`);
topic('c-a-acid','Axit, bazơ và chỉ thị','Acids and bases',`
pH|độ pH|pH describes how acidic or basic a solution is.
indicator|chất chỉ thị|An indicator can change colour at different pH values.
litmus|quỳ tím|Litmus is an acid-base indicator.
neutralisation|sự trung hòa|Neutralisation is a reaction between an acid and a base.
oxide|oxit|An oxide contains oxygen bonded to another element.
hydroxide|hiđroxit|Sodium hydroxide contains hydroxide ions.`);
topic('c-a-metal','Kim loại và phi kim','Metals and non-metals',`
non-metal|phi kim|Sulfur is a non-metal.
alloy|hợp kim|An alloy is a metallic material containing more than one element.
corrosion|sự ăn mòn|Corrosion can damage a metal over time.
rust|gỉ sắt|Rust forms when iron reacts with oxygen in the presence of water.
reactivity|tính phản ứng|Reactivity describes how readily a substance reacts.
conductivity|tính dẫn điện; tính dẫn nhiệt|Metals usually have high electrical conductivity.`);
topic('c-a-solution','Dung dịch và lượng chất','Solutions and amounts',`
concentration|nồng độ|Concentration describes how much solute a solution contains.
solubility|độ tan|Solubility is the maximum amount that dissolves under specified conditions.
saturated solution|dung dịch bão hòa|A saturated solution cannot dissolve more solute at that temperature.
dilution|sự pha loãng|Dilution decreases concentration by adding solvent.
mole|mol|The mole is a unit of amount of substance.
molar mass|khối lượng mol|Molar mass is mass per mole of a substance.`);
topic('c-b-atom','Bên trong nguyên tử','Atomic structure',`
atomic number|số hiệu nguyên tử|The atomic number equals the number of protons.
mass number|số khối|The mass number is the total number of protons and neutrons.
electron shell|lớp electron|An electron shell corresponds to a principal energy level.
orbital|obitan|An orbital describes the spatial probability distribution of an electron.
electron configuration|cấu hình electron|Electron configuration describes how electrons occupy orbitals.
ion|ion|An ion has a net electric charge.`);
topic('c-b-bond','Liên kết và bảng tuần hoàn','Bonding and periodicity',`
ionic bond|liên kết ion|An ionic bond is electrostatic attraction between oppositely charged ions.
covalent bond|liên kết cộng hóa trị|A covalent bond involves shared electron pairs.
electronegativity|độ âm điện|Electronegativity describes an atom's attraction for bonding electrons.
hydrogen bond|liên kết hiđro|Hydrogen bonds can form between water molecules.
periodic trend|xu hướng tuần hoàn|A periodic trend describes a pattern in element properties.
valence electron|electron hóa trị|Valence electrons participate in many chemical bonds.`);
topic('c-b-energy','Tốc độ và năng lượng phản ứng','Reaction rates and energy',`
reaction rate|tốc độ phản ứng|Reaction rate describes how fast reactants are consumed or products form.
activation energy|năng lượng hoạt hóa|Activation energy is an energy barrier for a reaction pathway.
exothermic reaction|phản ứng tỏa nhiệt|An exothermic reaction releases heat to its surroundings.
endothermic reaction|phản ứng thu nhiệt|An endothermic reaction absorbs heat from its surroundings.
enthalpy|entanpi|Enthalpy change equals heat transfer at constant pressure under usual conditions.
equilibrium constant|hằng số cân bằng|An equilibrium constant relates equilibrium activities at a stated temperature.`);
topic('c-b-organic','Hợp chất hữu cơ','Organic chemistry',`
functional group|nhóm chức|A functional group influences an organic compound's reactions.
alkane|ankan|An alkane is a saturated acyclic hydrocarbon.
alkene|anken|An alkene contains a carbon-carbon double bond.
alcohol|ancol|An alcohol has a hydroxyl group attached to a saturated carbon atom.
carboxylic acid|axit cacboxylic|A carboxylic acid contains a carboxyl group.
isomer|đồng phân|Isomers have the same molecular formula but different structures or arrangements.`);
topic('c-b-redox','Oxi hóa, khử và điện hóa','Redox and electrochemistry',`
reduction|sự khử|Reduction involves gaining electrons.
oxidising agent|chất oxi hóa|An oxidising agent accepts electrons and is reduced.
reducing agent|chất khử|A reducing agent donates electrons and is oxidised.
electrode|điện cực|An electrode conducts electrons into or out of an electrochemical cell.
anode|anot|Oxidation occurs at the anode.
cathode|catot|Reduction occurs at the cathode.`);
topic('b-a-body','Cơ thể là một hệ thống','Body systems',`
tissue|mô|A tissue is a group of cells working together.
skeleton|bộ xương|The skeleton supports the body.
muscle|cơ|A muscle can contract to produce force.
nervous system|hệ thần kinh|The nervous system carries and processes signals.
heart|tim|The heart pumps blood.
lung|phổi|The lungs exchange gases with the air.`);
topic('b-a-nutrition','Dinh dưỡng và tiêu hóa','Nutrition',`
nutrient|chất dinh dưỡng|A nutrient supports an organism's growth or function.
protein|protein; chất đạm|Proteins have many structural and functional roles.
carbohydrate|cacbohiđrat; chất bột đường|Carbohydrates can supply energy for cells.
fat|chất béo|Fat can store energy in the body.
absorption|sự hấp thụ|Absorption moves digested nutrients into the body's transport system.
small intestine|ruột non|Most nutrient absorption occurs in the small intestine.`);
topic('b-a-cell','Từ tế bào đến cơ thể','Cells and organization',`
cell membrane|màng tế bào|The cell membrane regulates movement into and out of a cell.
cytoplasm|tế bào chất|Cytoplasm contains many cell components.
mitochondrion|ti thể|A mitochondrion produces much of a eukaryotic cell's ATP.
diffusion|sự khuếch tán|Diffusion produces net movement down a concentration gradient.
osmosis|sự thẩm thấu|Osmosis is net water movement across a selectively permeable membrane.
organ system|hệ cơ quan|An organ system has organs that work together.`);
topic('b-a-heredity','Di truyền qua thế hệ','Inheritance',`
DNA|ADN|DNA stores genetic information.
allele|alen|An allele is a version of a gene.
genotype|kiểu gen|A genotype describes an organism's genetic makeup at specified loci.
phenotype|kiểu hình|A phenotype is an observable characteristic.
dominant allele|alen trội|A dominant allele can affect the phenotype in a heterozygote.
recessive allele|alen lặn|A recessive allele is masked by a fully dominant allele in a heterozygote.`);
topic('b-a-ecology','Sinh vật và môi trường','Ecology',`
habitat|môi trường sống|A habitat is the place where an organism lives.
food web|lưới thức ăn|A food web shows connected feeding relationships.
competition|sự cạnh tranh|Competition occurs when organisms need the same limited resource.
predation|quan hệ vật ăn thịt và con mồi|Predation involves one organism consuming another.
parasite|sinh vật ký sinh|A parasite benefits at its host's expense.
symbiosis|sự sống chung giữa các loài|Symbiosis is a close relationship between different species.`);
topic('b-b-process','Các quá trình trong tế bào','Cell processes',`
ATP|ATP; phân tử mang năng lượng|ATP transfers usable energy in cells.
active transport|vận chuyển chủ động|Active transport uses energy to move substances against a gradient.
meiosis|giảm phân|Meiosis produces cells with half the original chromosome number.
cell cycle|chu kỳ tế bào|The cell cycle includes growth and division.
chloroplast|lục lạp|Photosynthesis occurs in chloroplasts of plants and algae.
substrate|cơ chất|A substrate binds to an enzyme's active site.`);
topic('b-b-genetics','Từ gen đến tính trạng','Molecular genetics',`
DNA replication|sự nhân đôi ADN|DNA replication copies a DNA molecule.
transcription|sự phiên mã|Transcription produces RNA using a DNA template.
translation|sự dịch mã|Translation uses an RNA message to build a polypeptide.
codon|bộ ba mã hóa|A codon is a group of three nucleotides in messenger RNA.
ribosome|ribôxôm|A ribosome assembles a polypeptide during translation.
gene expression|sự biểu hiện gen|Gene expression produces a functional product from genetic information.`);
topic('b-b-physiology','Trao đổi chất và điều hòa','Physiology',`
negative feedback|phản hồi âm|Negative feedback counteracts a change in a system.
stomata|khí khổng|Stomata regulate gas exchange in many leaves.
xylem|mạch gỗ|Xylem transports water and minerals in plants.
phloem|mạch rây|Phloem transports sugars and other organic substances.
stimulus|kích thích|A stimulus can trigger a response.
receptor|thụ thể|A receptor detects a specific signal.`);
topic('b-b-evolution','Sự đa dạng qua thời gian','Evolution',`
genetic variation|biến dị di truyền|Genetic variation provides differences on which natural selection can act.
genetic drift|phiêu bạt di truyền|Genetic drift changes allele frequencies through chance.
gene flow|dòng gen|Gene flow moves alleles between populations.
speciation|sự hình thành loài|Speciation produces new species.
common ancestor|tổ tiên chung|Related species share a common ancestor.
fossil|hóa thạch|A fossil preserves evidence of past life.`);
topic('b-b-ecosystem','Quần thể và hệ sinh thái','Populations and ecosystems',`
carrying capacity|sức chứa của môi trường|Carrying capacity is the population an environment can sustain under given conditions.
ecological niche|ổ sinh thái|An ecological niche includes a species' use of resources and conditions.
succession|diễn thế sinh thái|Succession changes a community over time.
biomass|sinh khối|Biomass is the mass of living material in a stated area or group.
trophic level|bậc dinh dưỡng|A trophic level describes a feeding position in a food web.
limiting factor|nhân tố giới hạn|A limiting factor restricts population growth.`);
topic('e-a-material','Làm quen với vật liệu','Materials',`
paper|giấy|We can fold paper to make a model.
cardboard|bìa cứng|Cardboard is thicker than ordinary paper.
fabric|vải|A bag can be made from fabric.
rubber|cao su|Rubber can bend and stretch.
string|dây|A string can join two parts of a model.
clay|đất nặn|We can shape soft clay with our hands.`);
topic('e-a-tool','Dụng cụ trong góc sáng tạo','Tools',`
scissors|kéo|Scissors cut paper.
glue|keo dán|Glue joins pieces of paper.
tape|băng dính|Tape can hold two pieces together.
hammer|búa|A hammer can drive a nail.
ruler|thước kẻ|A ruler helps us draw a straight line.
pencil|bút chì|Use a pencil to draw your idea.`);
topic('e-a-part','Những bộ phận nhỏ','Parts',`
block|khối lắp ghép|We stack a block on another block.
base|phần đế|A wide base can help a tower stand.
handle|tay cầm|A handle makes a tool easier to hold.
button|nút bấm|Press a button to start the toy.
rope|dây thừng|A rope can pull a light model.
beam|thanh dầm|A beam can support a model bridge.`);
topic('e-a-build','Cùng xây một mô hình','Building',`
tower|tòa tháp|Build a tower with blocks.
roof|mái nhà|A roof covers the top of a house.
wall|bức tường|The model house has four walls.
road|con đường|A road connects two places.
connect|kết nối|Connect the two parts of the model.
fold|gấp|Fold the paper along the line.`);
topic('e-a-idea','Thử, sửa và thử lại','Making and testing',`
idea|ý tưởng|Draw your idea before you build.
plan|kế hoạch|A plan lists what we want to do.
test|thử nghiệm|Test the paper bridge with a small load.
fix|sửa|We can fix the loose part.
strong|chắc; bền|A strong bridge can support a load.
stable|vững|A stable tower is less likely to fall.`);
topic('e-b-machine','Máy cơ đơn giản','Simple machines',`
inclined plane|mặt phẳng nghiêng|An inclined plane helps raise a load over a longer distance.
wedge|cái nêm|A wedge can split or separate materials.
screw|vít; máy cơ dạng vít|A screw has an inclined plane wrapped around a cylinder.
fulcrum|điểm tựa|A lever turns about a fulcrum.
effort|lực tác dụng để vận hành|Effort is the input force used in a simple machine.
mechanical advantage|lợi về lực|Mechanical advantage compares output force with input force.`);
topic('e-b-structure','Cầu, khung và tải trọng','Structures',`
frame|khung|A frame supports the shape of a structure.
truss|giàn chịu lực|A truss often uses triangular units.
arch|vòm|An arch can carry a load over an opening.
foundation|nền móng|A foundation transfers a building's load to the ground.
compression|sự nén|Compression pushes parts of a material together.
tension|sự kéo căng|Tension pulls parts of a material apart.`);
topic('e-b-design','Từ bản vẽ đến mô hình','Design process',`
requirement|yêu cầu|A requirement states what a design must do.
brainstorm|động não tìm ý tưởng|We brainstorm several ways to solve the problem.
diagram|sơ đồ|A diagram shows how the parts connect.
evaluate|đánh giá|Evaluate the model against the requirements.
improve|cải tiến|We improve the design after testing.
iteration|lần lặp để cải tiến|Each iteration tests and improves the idea.`);
topic('e-b-energy','Nguồn năng lượng cho sáng tạo','Energy in designs',`
battery|pin; bộ pin|A battery supplies electrical energy.
solar panel|tấm pin mặt trời|A solar panel converts sunlight into electrical energy.
wind turbine|tuabin gió|A wind turbine converts wind energy into useful mechanical or electrical energy.
electric motor|động cơ điện|An electric motor converts electrical energy into motion.
input energy|năng lượng đầu vào|Input energy enters a system.
useful output|đầu ra có ích|A lamp's useful output includes visible light.`);
topic('e-b-safety','Làm việc cẩn thận','Workshop habits',`
safety goggles|kính bảo hộ|Safety goggles help protect the eyes.
protective gloves|găng tay bảo hộ|Protective gloves are chosen to suit the task.
workspace|khu vực làm việc|A clear workspace makes work easier.
instruction|hướng dẫn|Read the instruction before using a tool.
inspect|kiểm tra|Inspect the model for loose parts.
warning sign|biển cảnh báo|A warning sign points out a hazard.`);
topic('e-c-drawing','Ngôn ngữ bản vẽ kỹ thuật','Technical drawing',`
orthographic view|hình chiếu vuông góc|An orthographic view shows an object from one direction.
front view|hình chiếu đứng|A front view shows the front of an object.
top view|hình chiếu bằng|A top view shows an object from above.
section view|hình cắt|A section view reveals internal features.
scale|tỉ lệ bản vẽ|The scale relates drawing size to actual size.
dimension line|đường kích thước|A dimension line indicates a measured size.`);
topic('e-c-mechanism','Truyền chuyển động','Mechanisms',`
gear ratio|tỉ số truyền bánh răng|A gear ratio relates the rotations of connected gears.
belt drive|bộ truyền đai|A belt drive transfers motion between pulleys.
chain drive|bộ truyền xích|A chain drive transfers motion between sprockets.
cam|cam|A cam can turn rotary motion into repeated follower motion.
crank|tay quay|A crank helps convert between rotary and reciprocating motion.
bearing|ổ trục|A bearing supports a moving shaft and reduces friction.`);
topic('e-c-electronic','Các linh kiện điện tử','Electronics',`
LED|điốt phát quang|An LED emits light when current flows through it in the forward direction.
diode|điốt|A diode conducts much more easily in one direction than the other.
transistor|transistor|A transistor can switch or amplify an electrical signal.
circuit board|bảng mạch|A circuit board holds and connects electronic components.
terminal|đầu nối điện|A terminal provides an electrical connection point.
wire|dây dẫn điện|A wire connects components in a circuit.`);
topic('e-c-control','Cảm biến và điều khiển','Control and automation',`
controller|bộ điều khiển|A controller decides how a system responds to input.
input signal|tín hiệu đầu vào|An input signal carries information to a controller.
output signal|tín hiệu đầu ra|An output signal carries a command from a controller.
robot|rôbốt|A robot can carry out programmed tasks.
programming|lập trình|Programming defines the instructions a system follows.
set point|giá trị đặt|A thermostat compares temperature with a set point.`);
topic('e-c-sustainable','Thiết kế tiết kiệm tài nguyên','Sustainable design',`
energy efficiency|hiệu quả sử dụng năng lượng|Energy efficiency compares useful output with energy input.
reusable|có thể tái sử dụng|A reusable product can be used more than once.
recyclable|có thể tái chế|A recyclable material can enter a suitable recycling process.
durability|độ bền sử dụng|Durability describes how well a product lasts.
maintenance|sự bảo trì|Maintenance helps a system keep working.
repairability|khả năng sửa chữa|Repairability describes how easily a product can be fixed.`);
topic('e-d-mechanics','Vật liệu dưới tác dụng lực','Engineering mechanics',`
elasticity|tính đàn hồi|Elasticity allows a material to recover its shape after unloading.
stiffness|độ cứng vững|Stiffness describes resistance to deformation under load.
shear stress|ứng suất cắt|Shear stress acts parallel to a surface.
bending moment|mômen uốn|A bending moment tends to bend a structural member.
fatigue|sự mỏi vật liệu|Fatigue damage can develop under repeated loading.
factor of safety|hệ số an toàn|A factor of safety compares a stated capacity with a stated demand.`);
topic('e-d-production','Từ thiết kế đến chế tạo','Manufacturing',`
CAD|thiết kế có sự hỗ trợ của máy tính|CAD software helps create precise design models.
3D printing|in ba chiều|3D printing builds a part layer by layer.
machining|gia công cắt gọt|Machining removes material to form a part.
casting|đúc|Casting shapes material using a mould.
quality control|kiểm soát chất lượng|Quality control checks whether products meet requirements.
surface finish|chất lượng bề mặt|Surface finish describes the texture of a manufactured surface.`);
topic('e-d-control','Mô hình và điều khiển hệ thống','Control systems',`
closed-loop control|điều khiển vòng kín|Closed-loop control uses feedback to adjust operation.
open-loop control|điều khiển vòng hở|Open-loop control operates without using output feedback.
error signal|tín hiệu sai lệch|An error signal compares a target with a measured value.
calibration|sự hiệu chuẩn|Calibration compares an instrument with a reference.
response time|thời gian đáp ứng|Response time describes how quickly a system reacts.
stability|tính ổn định|Stability concerns a system's behaviour after a disturbance.`);
topic('e-d-embedded','Hệ thống nhúng và kết nối','Embedded engineering',`
firmware|phần mềm nhúng mức thấp|Firmware provides instructions for a device's hardware.
analog signal|tín hiệu tương tự|An analog signal can vary continuously.
digital signal|tín hiệu số|A digital signal uses discrete values.
sampling|sự lấy mẫu|Sampling measures a signal at selected times.
communication protocol|giao thức truyền thông|A communication protocol defines rules for exchanging data.
real-time system|hệ thống thời gian thực|A real-time system must meet specified timing requirements.`);
topic('e-d-system','Tư duy hệ thống và đổi mới','Systems and innovation',`
trade-off|sự đánh đổi|A trade-off balances competing design goals.
reliability|độ tin cậy|Reliability describes the probability of performing a function under stated conditions.
risk assessment|đánh giá rủi ro|Risk assessment considers hazards, likelihood, and consequences.
verification|sự kiểm chứng theo yêu cầu|Verification checks whether specified requirements are met.
validation|sự xác nhận đáp ứng nhu cầu|Validation checks whether a solution meets its intended use.
life cycle cost|chi phí vòng đời|Life cycle cost includes costs across a product's useful life.`);
topic('i-a-parts','Khám phá chiếc máy tính','Computer parts',`
monitor|màn hình máy tính|A monitor displays pictures and text.
speaker|loa|A speaker produces sound.
headphones|tai nghe|Headphones let us listen to audio.
printer|máy in|A printer can print a picture on paper.
tablet|máy tính bảng|A tablet has a touch screen.
touch screen|màn hình cảm ứng|A touch screen responds to a finger's touch.`);
topic('i-a-action','Những thao tác đầu tiên','Computer actions',`
double-click|nháy đúp chuột|Double-click an icon to open it in many desktop apps.
drag|kéo|Drag the shape to a new place.
drop|thả|Drop the shape inside the box.
type|gõ|Type a word using the keyboard.
scroll|cuộn|Scroll down to see more of the page.
select|chọn|Select the picture you want to use.`);
topic('i-a-workspace','Góc làm việc trên màn hình','On the screen',`
desktop|màn hình nền|The desktop can contain app icons.
window|cửa sổ|An app can open in a window.
menu|trình đơn|A menu lists available commands.
cursor|con trỏ|The cursor shows where an action or text input will occur.
toolbar|thanh công cụ|A toolbar groups useful buttons.
app|ứng dụng|An app helps us do a task.`);
topic('i-a-draw','Vẽ và sáng tạo','Digital drawing',`
brush|cọ vẽ|Choose a brush to paint a line.
eraser|tẩy|The eraser removes part of a drawing.
colour|màu sắc|Choose a colour for the shape.
fill|tô đầy|Use fill to colour the inside of a shape.
undo|hoàn tác|Undo reverses the last supported action.
canvas|khung vẽ|Draw your picture on the canvas.`);
topic('i-a-safe','Dùng máy tính cẩn thận','Careful computer use',`
private|riêng tư|Keep private information to yourself or a trusted adult.
permission|sự cho phép|Ask permission before using someone else's device.
break|giờ nghỉ|Take a break from the screen.
posture|tư thế|A comfortable posture supports computer use.
volume|âm lượng|Keep the volume at a comfortable level.
log out|đăng xuất|Log out when you finish on a shared computer.`);
topic('i-b-files','Sắp xếp tệp và thư mục','Files and folders',`
filename|tên tệp|A filename helps identify a file.
rename|đổi tên|Rename the file to describe its contents.
copy|sao chép|Copy creates another version of selected content.
paste|dán|Paste inserts content from the clipboard.
delete|xóa|Delete removes the selected item.
backup|bản sao lưu|A backup keeps an extra copy of important files.`);
topic('i-b-web','Tìm hiểu trang web','Exploring the web',`
web page|trang nội dung trên web|A web page is displayed in a browser.
link|liên kết|A link can open another page.
address bar|thanh địa chỉ|Type a website address in the address bar.
keyword|từ khóa|A keyword helps narrow a search.
download|tải xuống|Download transfers a file to your device.
upload|tải lên|Upload transfers a file from your device to a remote service.`);
topic('i-b-code','Ra lệnh cho nhân vật','First programming steps',`
sequence|dãy lệnh theo thứ tự|A sequence runs instructions in order.
event|sự kiện|A click can trigger an event.
repeat|lặp lại|Repeat the movement four times.
sprite|nhân vật đồ họa|A sprite can move on a programming stage.
stage|sân khấu lập trình|Sprites appear on the stage.
block|khối lệnh|A programming block represents an instruction or expression.`);
topic('i-b-present','Kể chuyện bằng trang chiếu','Presentations',`
slide|trang chiếu|A slide can contain text and pictures.
title|tiêu đề|A title introduces the slide's subject.
text box|hộp văn bản|Type your sentence in a text box.
image|hình ảnh|An image can explain an idea visually.
layout|bố cục|A layout arranges the items on a slide.
transition|hiệu ứng chuyển trang|A transition changes how the next slide appears.`);
topic('i-b-citizen','Một công dân số nhỏ','Digital citizenship',`
personal information|thông tin cá nhân|A home address is personal information.
trusted adult|người lớn đáng tin cậy|Ask a trusted adult when something online feels wrong.
source|nguồn thông tin|Check the source of information.
copyright|quyền tác giả|Copyright protects certain uses of creative works.
credit|ghi công nguồn|Give credit when using someone else's work with permission.
report|báo cáo|Use report to flag inappropriate content on a service.`);
topic('i-c-program','Lập trình từng bước','Programming concepts',`
data type|kiểu dữ liệu|A data type describes the kind of value a program uses.
string|chuỗi ký tự|A string stores text.
integer|kiểu số nguyên|An integer value has no fractional part.
Boolean|kiểu logic|A Boolean value is true or false.
conditional statement|câu lệnh điều kiện|A conditional statement chooses an action based on a condition.
loop|vòng lặp|A loop repeats a set of instructions.`);
topic('i-c-sheet','Làm việc với bảng tính','Spreadsheets',`
worksheet|trang tính|A worksheet organizes data in cells.
row|hàng|A row runs horizontally across a worksheet.
column|cột|A column runs vertically down a worksheet.
range|vùng ô|A range is a selected group of cells.
cell reference|địa chỉ ô|B2 is a cell reference.
chart|biểu đồ|A chart displays data visually.`);
topic('i-c-network','Kết nối và trao đổi dữ liệu','Networks',`
router|bộ định tuyến|A router forwards data between networks.
server|máy chủ|A server provides a service to other computers.
client|máy khách; phần mềm khách|A client requests a service from a server.
IP address|địa chỉ IP|An IP address identifies a network interface within an IP network.
bandwidth|băng thông|Bandwidth often describes a link's data-carrying capacity.
packet|gói tin|A packet carries a portion of data across a network.`);
topic('i-c-database','Tổ chức dữ liệu','Databases',`
table|bảng dữ liệu|A database table contains rows and columns.
field|trường dữ liệu|A field stores one type of information in a record.
record|bản ghi|A record groups information about one item.
sort|sắp xếp|Sort arranges values in a chosen order.
filter|lọc|A filter displays only matching records.
query|truy vấn|A query requests data from a database.`);
topic('i-c-security','Giữ an toàn trong thế giới số','Cybersecurity',`
phishing|lừa đảo giả mạo để lấy thông tin|Phishing messages try to trick people into revealing information or taking unsafe actions.
malware|phần mềm độc hại|Malware is software designed to cause harm.
firewall|tường lửa|A firewall controls network traffic according to rules.
authentication|sự xác thực|Authentication checks a claimed identity.
two-factor authentication|xác thực hai yếu tố|Two-factor authentication requires two different types of evidence.
privacy|quyền riêng tư|Privacy concerns control over personal information.`);
topic('i-d-software','Xây dựng phần mềm','Software development',`
parameter|tham số|A parameter is a named input in a function definition.
return value|giá trị trả về|A return value is a result sent back by a function.
recursion|đệ quy|Recursion solves a problem using smaller instances of itself.
exception|ngoại lệ|An exception signals an unusual condition during execution.
unit test|kiểm thử đơn vị|A unit test checks a small piece of software in isolation.
version control|quản lý phiên bản|Version control records changes to files over time.`);
topic('i-d-data','Cơ sở dữ liệu quan hệ','Relational data',`
foreign key|khóa ngoại|A foreign key references a key in a related table.
relationship|mối quan hệ dữ liệu|A relationship links records in different tables.
join|phép kết nối bảng|A join combines rows using a stated condition.
index|chỉ mục|An index can speed up some database queries.
transaction|giao dịch dữ liệu|A transaction groups operations into a logical unit.
normalisation|chuẩn hóa dữ liệu|Normalisation structures tables to reduce certain kinds of redundancy.`);
topic('i-d-web','Web và giao tiếp giữa hệ thống','Web technologies',`
HTML|ngôn ngữ đánh dấu siêu văn bản|HTML gives web content its structure.
CSS|ngôn ngữ định kiểu trang web|CSS controls the presentation of web content.
HTTP|giao thức truyền siêu văn bản|HTTP defines messages exchanged between web clients and servers.
API|giao diện lập trình ứng dụng|An API defines how software components can interact.
request|yêu cầu gửi tới hệ thống|A client sends a request to a server.
response|phản hồi từ hệ thống|A server returns a response to a request.`);
topic('i-d-ai','Làm quen với trí tuệ nhân tạo','Artificial intelligence',`
dataset|tập dữ liệu|A dataset is a collection of related data.
feature|đặc trưng đầu vào|A feature is an input property used by a model.
label|nhãn dữ liệu|A label is a target value in supervised learning.
inference|sự suy luận bằng mô hình|Inference uses a trained model to produce an output.
overfitting|sự quá khớp|Overfitting fits training data too closely and can harm generalisation.
bias|độ chệch; thiên lệch|Bias can refer to systematic errors or unfair patterns in an AI system.`);
topic('i-d-security','Bảo vệ dữ liệu và quyền truy cập','Data protection',`
authorisation|sự phân quyền truy cập|Authorisation determines which actions an identity may perform.
access control|kiểm soát truy cập|Access control restricts who can use a resource.
hash|giá trị băm|A hash function maps input data to a fixed-size output.
digital signature|chữ ký số|A digital signature helps verify a message's origin and integrity.
integrity|tính toàn vẹn dữ liệu|Data integrity concerns accuracy and consistency of data.
confidentiality|tính bảo mật thông tin|Confidentiality limits information access to authorised recipients.`);

const BAND_PLANS = [
  ['maths',1,2,['m-a-number','m-a-operation','m-a-shape','m-a-measure','m-a-time']],
  ['maths',3,5,['m-b-operation','m-b-fraction','m-b-geometry','m-b-measure','m-b-data']],
  ['maths',6,7,['m-c-number','m-c-ratio','m-c-angle','m-c-shape','m-c-chance']],
  ['maths',8,9,['m-d-algebra','m-d-equation','m-d-geometry','m-d-circle','m-d-graph']],
  ['maths',10,12,['m-e-function','m-e-calculus','m-e-space','m-e-probability','m-e-statistics']],
  ['sciences',1,2,['s-a-body','s-a-animal','s-a-plant','s-a-weather','s-a-material']],
  ['sciences',3,5,['s-b-living','s-b-water','s-b-light','s-b-space','s-b-environment']],
  ['sciences',6,7,['s-c-cell','s-c-energy','s-c-matter','s-c-ecology','s-c-lab']],
  ['physics',8,9,['p-a-motion','p-a-fluid','p-a-heat','p-a-circuit','p-a-light']],
  ['physics',10,12,['p-b-mechanics','p-b-waves','p-b-field','p-b-modern','p-b-ac']],
  ['chemistry',8,9,['c-a-matter','c-a-reaction','c-a-acid','c-a-metal','c-a-solution']],
  ['chemistry',10,12,['c-b-atom','c-b-bond','c-b-energy','c-b-organic','c-b-redox']],
  ['biology',8,9,['b-a-body','b-a-nutrition','b-a-cell','b-a-heredity','b-a-ecology']],
  ['biology',10,12,['b-b-process','b-b-genetics','b-b-physiology','b-b-evolution','b-b-ecosystem']],
  ['engineering',1,2,['e-a-material','e-a-tool','e-a-part','e-a-build','e-a-idea']],
  ['engineering',3,5,['e-b-machine','e-b-structure','e-b-design','e-b-energy','e-b-safety']],
  ['engineering',6,9,['e-c-drawing','e-c-mechanism','e-c-electronic','e-c-control','e-c-sustainable']],
  ['engineering',10,12,['e-d-mechanics','e-d-production','e-d-control','e-d-embedded','e-d-system']],
  ['it',1,2,['i-a-parts','i-a-action','i-a-workspace','i-a-draw','i-a-safe']],
  ['it',3,5,['i-b-files','i-b-web','i-b-code','i-b-present','i-b-citizen']],
  ['it',6,9,['i-c-program','i-c-sheet','i-c-network','i-c-database','i-c-security']],
  ['it',10,12,['i-d-software','i-d-data','i-d-web','i-d-ai','i-d-security']]
];
const LESSONS = [];
for(const [subject,min,max,keys] of BAND_PLANS){
  for(let grade=min;grade<=max;grade++){
    const base=WORDS.filter(w=>w.subject===subject&&w.grade===grade);
    const foundationId=`${subject}-${grade}-foundation`;
    base.forEach(w=>w.lessonIds=[foundationId]);
    LESSONS.push({id:foundationId,subject,grade,number:1,title:'Khởi động: từ vựng nền tảng',en:'Getting started',wordIds:base.map(w=>w.id)});
    keys.forEach((key,index)=>{
      const t=TOPIC_BANK[key],id=`${subject}-${grade}-${key}`;
      const ids=t.entries.map((entry,n)=>{
        let word=WORDS.find(w=>w.subject===subject&&w.grade===grade&&w.en.toLowerCase()===entry.en.toLowerCase());
        if(!word){word={...entry,id:`${subject}-${grade}-${key}-${n}`,subject,grade,lessonIds:[]};WORDS.push(word);}
        word.lessonIds.push(id);return word.id;
      });
      LESSONS.push({id,subject,grade,number:index+2,title:t.title,en:t.en,wordIds:ids});
    });
  }
}
const CATALOG = {version:2,lessons:LESSONS.length,entries:WORDS.length,uniqueEnglish:new Set(WORDS.map(w=>w.en.toLowerCase())).size};
