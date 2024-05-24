import QuizzesAndResults from "@/components/QuizzesAndResults";
import HeaderSection from "@/ui-components/HeaderSection";

const Performance = () => {
    return (
        <>
            <HeaderSection
                heading={'Quizzes and Results'}
                subHeading={'Perfomance trends'}
            />
            <QuizzesAndResults/>
        </>
    );
}

export default Performance;