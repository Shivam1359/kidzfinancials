// import '../../components/Title/Title.css'; // Removed CSS import

const Title = ({subTitle, title}) => {
    return(
        // Adjusted font styles for subtitle and title
        <div className="text-center pt-16 md:pt-20 mb-12 md:mb-16">
            <p className="text-base font-medium text-primary-700 mb-2">{subTitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 leading-tight">{title}</h2>
        </div>
    );
};

export default Title;
