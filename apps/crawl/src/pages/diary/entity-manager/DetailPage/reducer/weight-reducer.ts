type WeightState = {
    weight: string;
    date: Date;
};

interface SetWeight {
    type: 'SET_WEIGHT';
    weight: string;
}

interface SetDate {
    type: 'SET_DATE';
    date: Date;
}

type WeightActions = SetWeight | SetDate;

export default function weightReducer(state: WeightState, actions: WeightActions): WeightState {
    switch (actions.type) {
        case 'SET_WEIGHT':
            return setWeight(state, actions.weight);
        case 'SET_DATE':
            return { ...state, date: actions.date };
        default:
            throw new Error('weight reducer 잘못된 type 입니다.');
    }
}

function setWeight(state: WeightState, weight: string): WeightState {
    const textSize = weight.length;
    const reg = /^-?\d*(\.\d*)\.+$/;
    const dotRemoveText = reg.test(weight) ? weight.slice(0, textSize - 1) : weight;
    const newWeight = dotRemoveText[0] === '.' ? '0' + weight : dotRemoveText;

    return {
        ...state,
        weight: newWeight,
    };
}
