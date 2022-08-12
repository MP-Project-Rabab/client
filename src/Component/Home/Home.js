import React from "react";
import { Link } from "react-router-dom";

// End of import all dependencies
import pexels1 from "../../img/pexels1.jpg";
import p1 from "../../img/p1.png";
import pg1 from "../../img/pg1.jpg";

import "./style.css";
const Home = () => {
  return (
    <div className="home">
      <section className="section1">
        <h1 className="h1"> إملأ مكانك بالنباتات</h1>
        <p className="p1">
          نحن عشاق النباتات! نقدم لك مجموعة منتقاة بعناية من النباتات الداخلية
          والخارجية والسلع من الموزع المفضل لدينا ونقدمها لك. سنشارك جميع
          نصائحنا الخاصة بالعناية من المبتدئين إلى المحترفين. نقوم أيضًا بتصميم
          مكان عملك حتى يشعر المتعاونون معك بالراحة أثناء العمل
        </p>
      </section>
      <section className="section2">
        <img src={pexels1} alt="" className="img1" />
        <div className="box1"></div>
        <h1>"كن صديقاً للنبات ففي النباتات تفاصيل جميلة للحياة"</h1>
        <p className="p2">
          نعتقد أن رؤية النبات في حياتك اليومية يجلب الفرح. لذلك نحن نبذل قصارى
          جهدنا لتسهيل الوصول إليها. هناك الكثير من النباتات المتنوعة التي ستجد
          واحدة تحبها من تلك التي لا تحتاج إلى الانتباه إلى تلك التي تطلب الثناء
          كل يوم.
        </p>
      </section>
      <section className="section3">
        <div className="box2"></div>
        <h1>منتج من متجرنا </h1>
        <p className="p3">
          أسهل طريقة لجعل حياتك صحية هي عن طريق شراء النباتات المفضلة لديك
        </p>
        <img src={p1} alt="" className="img2" />
        <h4>نبتة جلد النمر</h4>
      </section>
      <section className="section4">
        <div className="box3">
          <img src={pg1} alt="" className="img3" />
        </div>
        <h1>" النباتات تجعل الحياة أفضل "</h1>

        <p className="p4">
          تقلل النباتات من التوتر وتحسن مزاجك ، لذا فهي مثالية للاستخدام في
          المنزل ومكان العمل, لمعرفة كيفية، العناية بنباتاتك زر قسم:
        <Link to="/tips">طرق العنايه بالنباتات</Link>
        </p>

      </section>
    </div>
  );
};

export default Home;
