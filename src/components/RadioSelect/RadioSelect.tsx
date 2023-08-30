import React, { useState } from "react";
import * as S from "./RadioSelect.styles";

interface OptionProps {
	label: JSX.Element;
	value: string;
	text: string;
}

interface RadioSelectProps {
	options: OptionProps[];
	defaultSelectedValue: string;
	onChange?: (value: string) => void;
}

const RadioSelect: React.FC<RadioSelectProps> = ({
	options,
	defaultSelectedValue,
	onChange,
}) => {
	const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

	const handleOptionChange = (value: string) => {
		setSelectedValue(value);
		if (onChange) onChange(value);
	};

	return (
		<S.RadioContainer>
			{options.map((option) => (
				<S.RadioLabel
					key={option.value}
					selected={selectedValue === option.value}
				>
					<S.RadioInput
						type="radio"
						value={option.value}
						checked={selectedValue === option.value}
						onChange={() => handleOptionChange(option.value)}
					/>
					{option.label}
					{option.text}
				</S.RadioLabel>
			))}
		</S.RadioContainer>
	);
};

export default RadioSelect;
