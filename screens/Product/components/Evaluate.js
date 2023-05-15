import React, { useState } from "react";
import styled from "styled-components/native";
import Dice from "../../../components/Dice";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { closePopupModal } from "../../../store/actions/info";
import { H3, Subtitle2 } from "../../../components/Typography";
import { handleEvaluationProduct } from "../../../store/actions/product";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Dices = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
`;

export default () => {
  const dispatch = useDispatch();
  const { evaluationsProducts = [], products = {} } = useSelector(
    (state) => state.products
  );
  evaluationsProducts.map;
  const [evalutaion, setEvalutaion] = useState(
    evaluationsProducts.reduce(
      (a, b) => ({ [b]: products[b] ? products[b].myEvaluation : 0, ...a }),
      {}
    )
  );

  const enable = () => {
    return !!Object.keys(evalutaion)
      .map((key) => evalutaion[key] != 0)
      .find((f) => f == true);
  };

  return (
    <Container>
      <H3>Deixe sua avaliação</H3>
      <Space n={4} />
      {evaluationsProducts.map((key, index) => (
        <React.Fragment key={index}>
          {evaluationsProducts.length !== 1 && (
            <React.Fragment>
              <Subtitle2>{products[key].name}</Subtitle2>
              <Space n={1} />
            </React.Fragment>
          )}
          <Dices>
            {[1, 2, 3, 4, 5].map((i) => (
              <Dice
                onPress={(n) =>
                  setEvalutaion({
                    ...evalutaion,
                    [key]: n,
                  })
                }
                isSelected={evalutaion[key] >= i}
                size={2}
                key={i}
                number={i}
              />
            ))}
          </Dices>
          <Space n={3} />
        </React.Fragment>
      ))}
      <Space n={2} />

      <Line>
        <Button
          type="CallToAction-Outline"
          onPress={() => dispatch(closePopupModal())}
        >
          Cancelar
        </Button>
        <SpaceHorizontal n={4} />
        <Button
          disabled={!enable()}
          type="CallToAction-Orange"
          width={"auto"}
          onPress={() => dispatch(handleEvaluationProduct(evalutaion))}
        >
          Avaliar
        </Button>
      </Line>
    </Container>
  );
};
