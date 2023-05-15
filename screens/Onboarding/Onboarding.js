import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components/native";
import { H1 } from "../../components/Typography";
import Welcome from "./components/Welcome";
import FilterCustom from "../../components/FilterCustom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadFilters } from "../../store/actions/filters";
import Carrossel from "../../components/Carrossel";
import FisrtQuestion from "./components/FisrtQuestion";
import {
  startOnboarding,
  handleFinishOnboarding,
  closeOnboard,
} from "../../store/actions/onboarding";
import Finish from "./components/Finish";
import HowKnowUs from "./components/HowKnowUs";
import config from "../../config";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.lightColor};
  padding-top: ${(props) =>
    Platform.OS === "ios" ? props.theme.space.space4 : 0};
`;

export default withTheme((props) => {
  const dispatch = useDispatch();
  const onboarding = useSelector((state) => state.onboarding);
  const { steps = [] } = onboarding;
  const [step, setStep] = useState(0);

  if (onboarding.restart)
    return (
      <Container>
        <FilterCustom
          steps={steps}
          selectsState={onboarding.filters}
          onBack={() => dispatch(closeOnboard())}
          onNext={() => dispatch(handleFinishOnboarding())}
        />
      </Container>
    );

  if (config.translation == "zeero")
    return (
      <Container>
        <Carrossel blocked noMargin current={step}>
          <Welcome
            img={"welcome-zeero.png"}
            title={`Olá :)\nQue bom te ter por aqui!`}
            y
            texts={[
              "A *Zeero* veio para *(re)conectar* você com as *lojas físicas*, facilitando a sua relação com a *moda*.",
              "Você busca e compra produtos de diferentes lojas e *recebe* no seu endereço no *mesmo dia*!",
            ]}
            okBtn={"Gostei, me conta mais!"}
            onNext={() => setStep(1)}
          />

          <HowKnowUs onNext={() => setStep(2)} />
          <Welcome
            showListStyle
            img={"top5.png"}
            title={`TOP 5 antes de entrar:`}
            y
            texts={[
              "Esta é a nossa *1ª versão*,",
              "temos um número seleto de *parceiros* com lojas na *região do centro de São Paulo*...",
              "…e já já estaremos em mais lugares!",
              "*Compartilhe sempre* feedbacks e ideias com a gente!",
              "O item 4 é sério. *Precisamos de você*!",
            ]}
            okBtn={"Tô dentro, bora para o app!"}
            onNext={() => dispatch(handleFinishOnboarding())}
          />
        </Carrossel>
      </Container>
    );

  const onBack = () => setStep(step - 1);
  return (
    <Container>
      <Carrossel blocked noMargin current={step}>
        <Welcome
          okBtn={"Não, é minha primeira vez"}
          title={`Olá :)\nQue bom te ter por aqui!`}
          cancelBtn={"Sim, já tenho login"}
          img={"welcome.png"}
          footerText="Você já veio aqui antes?"
          texts={[
            "Neste aplicativo você encontrará todo o nosso acervo de jogos e poderá alugar quantos quiser de uma forma bem fácil!",
          ]}
          onNext={() => setStep(1)}
        />

        <FisrtQuestion
          onNext={() => {
            dispatch(startOnboarding());
            setStep(2);
          }}
        />
        <FilterCustom
          selectsState={onboarding.filters}
          steps={steps}
          onNext={() => setStep(3)}
        />

        <Finish />
      </Carrossel>
    </Container>
  );
});
