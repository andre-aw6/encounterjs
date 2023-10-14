import React, { useEffect } from "react";
import { View } from "react-native";
import Screen from "../../components/Screen";

import styled, { withTheme } from "styled-components/native";
import SearchBar from "./components/SearchBar";
import {
  H3,
  Subtitle2,
} from "../../components/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Tag } from "../../components/Tag";
import {
  handleClearSelects,
  handleChangeFilteringText,
  handleSetMyFavorites,
  handleNeedTutorial,
} from "../../store/actions/filters";
import ProductShelf from "../Product/components/ProductShelf";
import HeaderSeeAll from "../../components/HeaderSeeAll";
import FilterResult from "./components/FilterResult";
import { translation } from "../../texts";
import config from "../../config";

const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  padding-bottom: 0px;
  flex: 1;
`;

const FlexContent = styled.View`
  flex: 1;
`;

const Space = styled.View`
  height: ${(props) => props.theme.space.space2};
  width: 100%;
  color: ${(props) => props.theme.colors.secondColor};
`;

const Chips = styled.ScrollView`
  max-height: 40px;
  margin-top: ${(props) => props.theme.space.space1};
`;

const Space3 = styled.View`
    height: ${(props) => props.theme.space.space3};
    width: 1px;
`;
const Space2 = styled.View`
    height: ${(props) => props.theme.space.space2};
    width: 1px;
`;

const RecentItem = styled.TouchableOpacity`
  padding-bottom: ${(props) => props.theme.space.space1};
  padding-top: ${(props) => props.theme.space.space1};
  border-bottom-width: 0.5px;
  border-color: ${(props) => props.theme.colors.secondLightColor};
`;

const Search = (props) => {
  const {
    chips = [],
    recentTexts = [],
    isFiltered = false,
    isLoading = false,
  } = useSelector((state) => state.filters);
  const user = useSelector((state) => state.user);
  const { isLogged = false, userInfo = {} } = user;
  const favorites = userInfo.favorites ? userInfo.favorites : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleNeedTutorial());
  }, [dispatch]);

  const filterResult = () => (
    <FlexContent>
      <Chips showsHorizontalScrollIndicator={false} horizontal>
        {chips.map((chip, index) => (
          <Tag
            key={index}
            isSelected
            onClose={
              chip.isRemovable
                ? () => dispatch(handleClearSelects(chip.type))
                : undefined
            }
          >
            {chip.text}
          </Tag>
        ))}
      </Chips>
      <Space2 />

      <FilterResult />
    </FlexContent>
  );

  const recents = () => (
    <FlexContent>
      <FlexContent>
        <Space3 />
        <H3>Buscas Recentes</H3>
        <Space />
        {recentTexts && recentTexts.length > 0 ? (
          recentTexts
            .map((e) => e)
            .reverse()
            .map((item, index) => (
              <RecentItem
                key={index}
                onPress={() => dispatch(handleChangeFilteringText(item, false))}
              >
                <Subtitle2 color={props.theme.colors.secondDarkColor}>
                  {item}
                </Subtitle2>
              </RecentItem>
            ))
        ) : (
          <Subtitle2 type="secondColor">
            Você ainda não possui buscas recentes
          </Subtitle2>
        )}
      </FlexContent>
      {isLogged && config.favorites && (
        <FlexContent>
          <HeaderSeeAll
            title={"Meus Favoritos"}
            showSeeAll={favorites.length > 0}
            onSeeAllPress={() => dispatch(handleSetMyFavorites())}
          ></HeaderSeeAll>
          <Space />
          {favorites.length > 0 ? (
            <View flex={1}>
              <ProductShelf hidePrice noFlex showRemember ids={favorites} />
            </View>
          ) : (
            <Subtitle2 type="secondColor">
              {translation("search.favorites")}{" "}
            </Subtitle2>
          )}
        </FlexContent>
      )}
    </FlexContent>
  );
  return (
    <Screen noScroll>
      <Container>
        <SearchBar type="Filter" />
        {isFiltered || isLoading ? filterResult() : recents()}
      </Container>
    </Screen>
  );
};

export default withTheme(Search);
