// Vocabulary samples by grade. This is an independent learning collection,
// not a complete or officially mapped Vietnamese school curriculum.
const SUBJECTS = [
  {id:'maths',name:'Maths',vi:'Toán học',icon:'math',color:'purple',min:1,max:12,description:'Từ những con số đến những lời giải thú vị.'},
  {id:'sciences',name:'Sciences',vi:'Khoa học',icon:'science',color:'teal',min:1,max:7,description:'Khám phá thế giới qua những điều gần gũi.'},
  {id:'physics',name:'Physics',vi:'Vật lý',icon:'atom',color:'blue',min:8,max:12,description:'Hiểu cách thế giới chuyển động quanh ta.'},
  {id:'chemistry',name:'Chemistry',vi:'Hóa học',icon:'flask',color:'orange',min:8,max:12,description:'Khám phá những biến đổi diệu kỳ của vật chất.'},
  {id:'biology',name:'Biology',vi:'Sinh học',icon:'leaf',color:'green',min:8,max:12,description:'Mở cánh cửa vào thế giới của sự sống.'},
  {id:'engineering',name:'Engineering',vi:'Kỹ thuật',icon:'gear',color:'pink',min:1,max:12,description:'Biến những ý tưởng nhỏ thành sáng tạo lớn.'},
  {id:'it',name:'IT',vi:'Công nghệ thông tin',icon:'code',color:'cyan',min:1,max:12,description:'Kết nối với ngôn ngữ của thế giới số.'}
];
const SUBJECT_DESCRIPTIONS_EN = {
  maths:'From numbers to the language of problem-solving.',
  sciences:'Discover the science in the world around you.',
  physics:'Understand motion, energy, and the physical world.',
  chemistry:'Explore matter and how substances change.',
  biology:'Open a window into the world of living things.',
  engineering:'Turn small ideas into creative solutions.',
  it:'Connect with the language of the digital world.'
};
const RAW = {
maths: [
`number|số|Five is a number.
circle|hình tròn|A coin is shaped like a circle.
add|cộng|Add two and three to get five.
count|đếm|Count the apples on the table.`,
`subtract|trừ|Subtract two from six to get four.
rectangle|hình chữ nhật|A rectangle has four sides.
length|độ dài|Measure the length of the pencil.
hundred|một trăm|Ten groups of ten make one hundred.`,
`multiply|nhân|Multiply three by four to get twelve.
divide|chia|Divide twelve by three to get four.
perimeter|chu vi|Add all the side lengths to find the perimeter.
fraction|phân số|One half is a fraction.`,
`numerator|tử số|In three quarters, the numerator is three.
denominator|mẫu số|In three quarters, the denominator is four.
angle|góc|A right angle measures ninety degrees.
parallel|song song|Parallel lines never meet in a plane.`,
`decimal|số thập phân|Zero point five is a decimal.
percentage|tỉ số phần trăm|Fifty percent is one half.
volume|thể tích|Volume tells us how much space an object takes up.
triangle|hình tam giác|A triangle has three sides.`,
`integer|số nguyên|Negative two is an integer.
prime number|số nguyên tố|Seven is a prime number.
factor|ước số|Three is a factor of twelve.
symmetry|tính đối xứng|A square has four lines of symmetry.`,
`ratio|tỉ số|The ratio of two to four equals one to two.
rational number|số hữu tỉ|One third is a rational number.
proportion|tỉ lệ thức|A proportion states that two ratios are equal.
probability|xác suất|The probability of heads on a fair coin is one half.`,
`linear equation|phương trình bậc nhất|Two x plus three equals seven is a linear equation.
polynomial|đa thức|A polynomial can contain several terms.
quadrilateral|hình tứ giác|A quadrilateral has four sides.
identity|hằng đẳng thức|An identity is true for every allowed value.`,
`square root|căn bậc hai|The square root of nine is three.
quadratic equation|phương trình bậc hai|A quadratic equation contains a squared variable.
tangent|tiếp tuyến|A tangent touches a circle at exactly one point.
circumference|chu vi đường tròn|The circumference is the distance around a circle.`,
`vector|vectơ|A vector has magnitude and direction.
function|hàm số|A function assigns one output to each input.
intersection|giao điểm|The two lines have one intersection.
standard deviation|độ lệch chuẩn|Standard deviation describes the spread of data.`,
`sequence|dãy số|Two, four, six, eight form a sequence.
limit|giới hạn|A limit describes the value a function approaches.
derivative|đạo hàm|A derivative describes a rate of change.
perpendicular|vuông góc|Perpendicular lines meet at a right angle.`,
`integral|tích phân|A definite integral can give the area under a curve.
logarithm|logarit|The logarithm of one hundred to base ten is two.
coordinate|tọa độ|A coordinate helps locate a point.
antiderivative|nguyên hàm|An antiderivative of two x is x squared.`
],
sciences: [
`plant|cây thực vật|A plant needs water to grow.
animal|động vật|A cat is an animal.
sun|Mặt Trời|The sun gives us light.
water|nước|We drink clean water.`,
`root|rễ cây|A root takes in water from the soil.
leaf|lá cây|A leaf can be green.
habitat|môi trường sống|A pond is a habitat for frogs.
weather|thời tiết|The weather is sunny today.`,
`soil|đất|Many plants grow in soil.
seed|hạt giống|A seed can grow into a plant.
air|không khí|We need air to breathe.
temperature|nhiệt độ|A thermometer measures temperature.`,
`solid|chất rắn|Ice is a solid.
liquid|chất lỏng|Water is a liquid at room temperature.
gas|chất khí|Air is a mixture of gases.
evaporation|sự bay hơi|Evaporation changes liquid water into water vapor.`,
`solar system|hệ Mặt Trời|Earth is part of the solar system.
planet|hành tinh|Earth is a planet.
life cycle|vòng đời|A butterfly has four stages in its life cycle.
food chain|chuỗi thức ăn|Grass, a rabbit, and a fox can form a food chain.`,
`cell|tế bào|A cell is a basic unit of life.
organism|sinh vật|A tree is a living organism.
measurement|phép đo|A careful measurement uses a suitable tool.
mixture|hỗn hợp|Salt and sand form a mixture.`,
`photosynthesis|sự quang hợp|Plants use light energy during photosynthesis.
ecosystem|hệ sinh thái|A forest is an ecosystem.
energy|năng lượng|Energy can be transferred between objects.
magnet|nam châm|A magnet can attract an iron nail.`
],
physics: [
`force|lực|A force can change an object's motion.
friction|lực ma sát|Friction slows a sliding box.
pressure|áp suất|Pressure is force per unit area.
gravity|lực hấp dẫn|Gravity keeps the planets in orbit.`,
`electric current|cường độ dòng điện|Electric current is measured in amperes.
voltage|hiệu điện thế|Voltage is measured in volts.
resistance|điện trở|Resistance is measured in ohms.
circuit|mạch điện|A closed circuit allows current to flow.`,
`velocity|vận tốc|Velocity includes both speed and direction.
acceleration|gia tốc|Acceleration is the rate of change of velocity.
momentum|động lượng|Momentum equals mass times velocity.
kinetic energy|động năng|A moving ball has kinetic energy.`,
`oscillation|dao động|A pendulum makes a repeated oscillation.
wavelength|bước sóng|Wavelength is the distance between adjacent wave crests.
frequency|tần số|Frequency is measured in hertz.
interference|sự giao thoa|Interference occurs when waves overlap.`,
`photon|photon|A photon is a quantum of light.
nucleus|hạt nhân|An atomic nucleus contains protons and neutrons.
radioactivity|sự phóng xạ|Radioactivity involves the decay of unstable nuclei.
half-life|chu kỳ bán rã|Half-life is the time for half the nuclei in a sample to decay.`
],
chemistry: [
`atom|nguyên tử|An atom has a nucleus and electrons.
element|nguyên tố hóa học|Oxygen is a chemical element.
molecule|phân tử|A water molecule has three atoms.
chemical reaction|phản ứng hóa học|A chemical reaction forms new substances.`,
`acid|axit|An acid can turn blue litmus paper red.
base|bazơ|A base can turn red litmus paper blue.
salt|muối|Sodium chloride is a salt.
metal|kim loại|Copper is a metal.`,
`electron|electron|An electron has a negative charge.
periodic table|bảng tuần hoàn|The periodic table organizes chemical elements.
chemical bond|liên kết hóa học|A chemical bond holds atoms together.
oxidation|sự oxi hóa|Oxidation involves the loss of electrons.`,
`equilibrium|cân bằng hóa học|At equilibrium, forward and reverse reaction rates are equal.
hydrocarbon|hiđrocacbon|A hydrocarbon contains only carbon and hydrogen.
catalyst|chất xúc tác|A catalyst increases a reaction rate without being consumed overall.
organic compound|hợp chất hữu cơ|Ethanol is an organic compound.`,
`ester|este|An ester can have a fruity smell.
polymer|polime|A polymer contains many repeating units.
electrolysis|sự điện phân|Electrolysis uses electrical energy to drive a reaction.
amino acid|axit amin|Amino acids are the building blocks of proteins.`
],
biology: [
`organ|cơ quan|The heart is an organ.
digestion|sự tiêu hóa|Digestion breaks food down into smaller substances.
respiration|sự hô hấp|Cellular respiration releases usable energy from nutrients.
circulation|sự tuần hoàn|Circulation transports blood around the body.`,
`gene|gen|A gene is a section of DNA.
chromosome|nhiễm sắc thể|A chromosome carries genetic information.
heredity|sự di truyền|Heredity passes traits from parents to offspring.
mutation|đột biến|A mutation is a change in genetic material.`,
`membrane|màng tế bào|The cell membrane controls the movement of substances.
enzyme|enzim|An enzyme speeds up a biochemical reaction.
mitosis|nguyên phân|Mitosis produces two genetically similar daughter cells.
microorganism|vi sinh vật|A microorganism is too small to see clearly without magnification.`,
`homeostasis|sự cân bằng nội môi|Homeostasis maintains stable internal conditions.
transpiration|sự thoát hơi nước|Transpiration is the loss of water vapor from plants.
hormone|hoocmôn|A hormone carries signals between parts of an organism.
reproduction|sự sinh sản|Reproduction produces new organisms.`,
`evolution|sự tiến hóa|Evolution changes inherited traits in populations over generations.
natural selection|chọn lọc tự nhiên|Natural selection can make helpful inherited traits more common.
biodiversity|đa dạng sinh học|Biodiversity includes the variety of living organisms.
population|quần thể|A population contains members of one species in an area.`
],
engineering: [
`tool|dụng cụ|A hammer is a tool.
build|xây dựng|We build a small tower with blocks.
wheel|bánh xe|A bicycle has two wheels.
bridge|cây cầu|A bridge helps us cross a river.`,
`material|vật liệu|Wood is a material.
wood|gỗ|We can make a chair from wood.
shape|hình dạng|The shape of this block is a cube.
join|nối|Join the two pieces together.`,
`design|bản thiết kế|Our design shows a model house.
model|mô hình|We make a model of a bridge.
structure|kết cấu|A strong structure can support a load.
support|bộ phận đỡ|The shelf needs a strong support.`,
`lever|đòn bẩy|A seesaw works as a lever.
pulley|ròng rọc|A pulley can change the direction of a force.
gear|bánh răng|A gear has teeth that fit into another gear.
axle|trục bánh xe|A wheel rotates around an axle.`,
`prototype|nguyên mẫu|We test a prototype before making the final product.
load|tải trọng|The bridge carries a heavy load.
balance|sự cân bằng|A wide base can improve balance.
joint|mối nối|A joint connects two parts.`,
`sketch|bản phác thảo|Start with a sketch of your idea.
dimension|kích thước|Write each dimension on the drawing.
mechanism|cơ cấu|A clock has a mechanism with moving parts.
constraint|ràng buộc thiết kế|Cost is a constraint in our design.`,
`sensor|cảm biến|A sensor can detect a change in temperature.
motor|động cơ|A motor turns electrical energy into mechanical energy.
renewable energy|năng lượng tái tạo|Solar power is a source of renewable energy.
efficiency|hiệu suất|Higher efficiency means less wasted energy for the same useful output.`,
`technical drawing|bản vẽ kỹ thuật|A technical drawing shows the dimensions of a part.
assembly|cụm lắp ráp|The assembly contains several connected parts.
tolerance|dung sai|Tolerance is the allowed variation in a dimension.
automation|sự tự động hóa|Automation lets a system perform tasks with less human input.`,
`control system|hệ thống điều khiển|A control system adjusts a machine's operation.
feedback|tín hiệu phản hồi|Feedback helps a system correct an error.
actuator|cơ cấu chấp hành|An actuator turns a control signal into physical movement.
power supply|bộ nguồn|A power supply provides electrical energy.`,
`stress|ứng suất|Stress is internal force per unit area.
strain|biến dạng tương đối|Strain describes a relative change in size or shape.
torque|mômen lực|Torque describes the turning effect of a force.
tensile strength|độ bền kéo|Tensile strength describes resistance to breaking under tension.`,
`microcontroller|vi điều khiển|A microcontroller can control a small robot.
embedded system|hệ thống nhúng|An embedded system performs a specific task inside a device.
signal|tín hiệu|The sensor sends a signal to the controller.
optimization|sự tối ưu hóa|Optimization improves a design within its constraints.`,
`sustainability|tính bền vững|Sustainability considers environmental and social effects over time.
life cycle assessment|đánh giá vòng đời|A life cycle assessment studies environmental impacts across a product's life.
finite element analysis|phân tích phần tử hữu hạn|Finite element analysis divides a model into smaller elements.
systems engineering|kỹ thuật hệ thống|Systems engineering coordinates the parts of a complex system.`
],
it: [
`computer|máy tính|A computer helps us learn.
screen|màn hình|Pictures appear on the screen.
mouse|chuột máy tính|Use the mouse to point at a picture.
keyboard|bàn phím|Type your name on the keyboard.`,
`click|nháy chuột|Click the button to start.
icon|biểu tượng|This icon opens a drawing app.
file|tệp tin|Save your picture in a file.
save|lưu|Save your work before closing the app.`,
`folder|thư mục|Put your files in a folder.
software|phần mềm|Drawing software helps us create pictures.
hardware|phần cứng|A keyboard is computer hardware.
password|mật khẩu|Keep your password private.`,
`internet|Internet|The internet connects computer networks.
website|trang web|A website can have many pages.
search engine|công cụ tìm kiếm|A search engine helps us find information online.
browser|trình duyệt|A browser displays web pages.`,
`algorithm|thuật toán|An algorithm is a sequence of steps to solve a problem.
loop|vòng lặp|A loop repeats a set of instructions.
instruction|câu lệnh|The robot follows an instruction.
program|chương trình|A program tells a computer what to do.`,
`data|dữ liệu|A chart can help us understand data.
network|mạng máy tính|A network connects devices.
input|đầu vào|A keyboard provides input to a computer.
output|đầu ra|A screen displays output from a computer.`,
`spreadsheet|bảng tính|A spreadsheet organizes data in rows and columns.
cell reference|địa chỉ ô|A1 is a cell reference.
formula|công thức|A formula can add values in a spreadsheet.
presentation|bài trình chiếu|A presentation can contain several slides.`,
`variable|biến|A variable stores a value that can change.
condition|điều kiện|A condition can be true or false.
debugging|gỡ lỗi|Debugging helps us find and fix errors.
source code|mã nguồn|A programmer writes source code.`,
`database|cơ sở dữ liệu|A database stores organized information.
record|bản ghi|Each record contains information about one item.
encryption|sự mã hóa|Encryption helps protect information.
cybersecurity|an toàn an ninh mạng|Cybersecurity helps protect digital systems and data.`,
`Boolean|kiểu logic|A Boolean value is either true or false.
function|hàm|A function is a reusable block of code.
list|danh sách|A list stores a sequence of items.
iteration|sự lặp|Iteration repeats steps in an algorithm.`,
`query|truy vấn|A query requests information from a database.
primary key|khóa chính|A primary key uniquely identifies a record.
SQL|ngôn ngữ truy vấn có cấu trúc|SQL is used to work with relational databases.
relational database|cơ sở dữ liệu quan hệ|A relational database organizes data into related tables.`,
`artificial intelligence|trí tuệ nhân tạo|Artificial intelligence enables computers to perform tasks that require learning or reasoning.
machine learning|học máy|Machine learning uses data to improve performance on a task.
neural network|mạng nơron|A neural network is a model made of connected computational units.
training data|dữ liệu huấn luyện|Training data is used to fit a machine learning model.`
]
};
const WORDS = SUBJECTS.flatMap(s => RAW[s.id].flatMap((group, n) => group.split('\n').map((line,i)=>{
  const [en,vi,example] = line.split('|');
  return {id:`${s.id}-${n+s.min}-${i}`,subject:s.id,grade:n+s.min,en,vi,example};
})));
const IPA = {'gravity':'/ˈɡræv.ə.ti/','force':'/fɔːs/','friction':'/ˈfrɪk.ʃən/','pressure':'/ˈpreʃ.ə/','atom':'/ˈæt.əm/','element':'/ˈel.ɪ.mənt/','molecule':'/ˈmɒl.ɪ.kjuːl/','gene':'/dʒiːn/','cell':'/sel/','variable':'/ˈveə.ri.ə.bəl/','computer':'/kəmˈpjuː.tə/','number':'/ˈnʌm.bə/','circle':'/ˈsɜː.kəl/','plant':'/plɑːnt/','water':'/ˈwɔː.tə/','linear equation':'/ˈlɪn.i.ə ɪˈkweɪ.ʒən/','polynomial':'/ˌpɒl.iˈnəʊ.mi.əl/','quadrilateral':'/ˌkwɒd.rɪˈlæt.ər.əl/','identity':'/aɪˈden.tə.ti/'};
