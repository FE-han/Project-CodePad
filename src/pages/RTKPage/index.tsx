import { useDispatch } from "react-redux";
import { useAppSelector } from "../../modules/hooks";
import { actions as getPersonalDataActions } from "../../modules/actions/exampleSlice";
import { useEffect, useState } from "react";

export interface PersonalData {
  name: string;
  phoneNumber: string;
  age: number;
}

export function RTKPage() {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.exampleSlice);
  const [inputData, setInputData] = useState<PersonalData>({
    name: "",
    phoneNumber: "",
    age: 0,
  });

  const loadTimer = 3000;
  const { name, phoneNumber, age } = inputData;

  const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  //새 인적사항을 보내기 시작하는 액션. api를 보내는 함수라고 생각하면 된다.
  const getReadyToChangeData = (inputData: PersonalData) => {
    dispatch(getPersonalDataActions.getPersonalDataPending(inputData));
  };

  //등록한 인적사항을 반영하는 액션. api 요청에 대한 응답을 여기서 배정한다고 생각하면 된다.
  const loadSuccess = (loadTimer: number) => {
    setTimeout(() => {
      dispatch(getPersonalDataActions.getPersonalDataFulFilled(inputData));
    }, loadTimer);
  };

  const buttonText = (isLoading: boolean) => {
    switch (isLoading) {
      case true:
        return "인적사항 전달중...(3초정도 걸림)";

      default:
        return "새 인적사항보내기";
    }
  };

  return (
    <div>
      Redux Toolkit Example Container
      <div>
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          onChange={handleChangeInputValue}
          value={name}
        />
        <br />
        <label htmlFor="phoneNumber">phoneNumber</label>
        <input
          name="phoneNumber"
          type="text"
          onChange={handleChangeInputValue}
          value={phoneNumber}
        />
        <br />
        <label htmlFor="age">age</label>
        <input
          name="age"
          className="age"
          type="number"
          onChange={handleChangeInputValue}
          value={age}
        />
      </div>
      <button
        onClick={(e) => {
          getReadyToChangeData(inputData);
          loadSuccess(loadTimer);
        }}
      >
        {buttonText(state.isLoading)}
      </button>
      <br />
      <div style={{ marginTop: "20px" }}>VIEW Data</div>
      <div>name : {state.name}</div>
      <div>phoneNumber : {state.phoneNumber}</div>
      <div>age : {state.age}</div>
    </div>
  );
}

export default RTKPage;
