import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { styled } from 'nativewind';
import quizData1 from '../JSON-files/quiz.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';
import { updateUser } from '../utils/updateUser';

const quizData = quizData1.states_and_union_territories;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

const QuizScreen: React.FC = ({navigation}:any) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [over, setOver] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [points, setPoints] = useState(0);

    const currentState = quizData[7];
    const currentQuestion = currentState.quiz[currentQuestionIndex];

    useEffect(() => {
        if (over) {
            setPoints(score * 50);
        }
    }, [over, score]);

    const handleOptionSelect = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        if (option === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleSubmit = () => {
        console.log("score: ", score);
        if (currentQuestionIndex === currentState.quiz.length - 1) {
            setOver(true);
        }

        updateUser(points, score);

    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < currentState.quiz.length - 1) {
            console.log("currentQuestionIndex: ", currentQuestionIndex);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            if (currentQuestionIndex === currentState.quiz.length - 2) {
                setShowSubmit(true);
            }
        }
    };

    const getOptionColor = (option: string) => {
        if (!isAnswered) return 'bg-gray-200';
        if (option === currentQuestion.answer) return 'bg-green-500';
        if (option === selectedOption) return 'bg-red-500';
        return 'bg-gray-200';
    };

    if (over) {
        return (
            <StyledView className="flex-1 justify-center items-center bg-gray-100">
                <StyledText className="text-2xl font-bold mb-4">Quiz Completed!</StyledText>
                <StyledText className="text-xl">
                    Your score: {score} out of {currentState.quiz.length}
                </StyledText>
                <StyledText className="text-xl">
                    Points: {points}
                </StyledText>
            </StyledView>
        );
    }

    return (
        <SafeAreaView className="flex-1 w-full h-screen">
            <ImageBackground
                source={require('../assets/mountainBack.jpg')}
                style={{ flex: 1 }}
            >
                <StyledView className="justify-start mt-28 flex-1 p-4">
                    <StyledView className="bg-black/50 rounded-lg p-4 mb-4">
                        <StyledText className="text-white text-lg font-bold mb-2">
                            Discover {currentState.state}
                        </StyledText>
                        <StyledView
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${((currentQuestionIndex + 1) / currentState.quiz.length) * 100}%` }}
                        />
                        <StyledText className="text-white text-right mt-1">
                            {currentQuestionIndex + 1}/{currentState.quiz.length}
                        </StyledText>
                    </StyledView>

                    <StyledView className="bg-white rounded-lg p-4 mb-4">
                        <StyledText className="text-black text-lg font-semibold mb-4">
                            {currentQuestion.question}
                        </StyledText>
                        {currentQuestion.options.map((option, index) => (
                            <StyledTouchableOpacity
                                key={index}
                                className={`p-3 rounded-lg mb-2 ${getOptionColor(option)}`}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <StyledText className="text-center text-black">
                                    {option}
                                </StyledText>
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>

                    {isAnswered && (showSubmit ? (
                        <StyledTouchableOpacity
                            className="bg-blue-500 p-3 rounded-lg"
                            onPress={handleSubmit}
                        >
                            <StyledText className="text-center text-white">
                                Submit
                            </StyledText>
                        </StyledTouchableOpacity>
                    ) : (
                        <StyledTouchableOpacity
                            className="bg-blue-500 p-3 rounded-lg"
                            onPress={handleNextQuestion}
                        >
                            <StyledText className="text-center text-white">
                                Next Question
                            </StyledText>
                        </StyledTouchableOpacity>
                    ))}

                    <StyledTouchableOpacity className="bg-gray-300 p-3 rounded-lg mt-2">
                        <StyledText className="text-center text-gray-600">
                            Report Question
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default QuizScreen;
