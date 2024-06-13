import PropTypes from "prop-types";

const FooterMiddleList = ({ title, listItems }) => {
  // console.log(listItems);
  return (
    <div>
      <h3 className="mb-3 font-titleFont text-base font-semibold text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 font-bodyFont">
        {listItems.map((item) => {
          return (
            <li className="footerLink" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FooterMiddleList.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.array,
};

export default FooterMiddleList;