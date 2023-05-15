import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import ProductItem from "../../Product/components/ProductItem";
import { handleSetRecentsFilteringText } from "../../../store/actions/filters";
import { useSelector, useDispatch } from "react-redux";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { Subtitle3 } from "../../../components/Typography";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-animatable";
import { translation } from "../../../texts";

const Content = styled.View`
  flex: 1;
`;

const ContentLine = styled.View`
  flex-flow: row;
  flex: 1;
`;

const Space = styled.View`
    width: ${(props) => props.theme.space.space2};    
    height: 1px;
`;

const Space2 = styled.View`
    height: ${(props) => props.theme.space.space2};
    width: 1px;
`;

export default (props) => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { results = [], isLoading = false } = filters;
  const [productsShow, setProductsShow] = useState([]);

  const ids = isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : results;

  const idsLines = [];
  let index = 0;
  for (let i = 0; i < ids.length / 2; i++) {
    idsLines.push({
      ids: [ids[i * 2], ids[i * 2 + 1]].filter((c) => c),
      index: index,
    });

    index++;
  }

  const onViewRef = React.useRef(({ viewableItems }) => {
    console.log(viewableItems);
    setProductsShow(viewableItems.map((i) => i.index));
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 20 });

  return (
    <React.Fragment>
      {results.length > 0 && !isLoading && (
        <Subtitle3 type="secondDarkColor">
          {results.length} resultado{results == 1 ? "" : "s"}
        </Subtitle3>
      )}
      {results.length == 0 && !isLoading && (
        <Subtitle3 type="secondDarkColor">
          {translation("search.noResult")}
        </Subtitle3>
      )}
      {isLoading && (
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={25} noMargin height={24} />
        </Placeholder>
      )}

      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={idsLines}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => (
          <View style={{ minHeight: 220 }}>
            <Space2 />
            <ContentLine>
              <ProductItem
                showRemember
                numberOfLines={1}
                isLoading={isLoading}
                onPress={() => dispatch(handleSetRecentsFilteringText())}
                flex
                showPrice
                id={item.ids[0]}
                showImage={productsShow.includes(index)}
              />
              <Space />
              <ProductItem
                showRemember
                numberOfLines={1}
                isLoading={isLoading}
                onPress={() => dispatch(handleSetRecentsFilteringText())}
                flex
                showPrice
                id={item.ids.length == 2 ? item.ids[1] : undefined}
                showImage={productsShow.includes(index)}
              />
            </ContentLine>
          </View>
        )}
        keyExtractor={(item, index) => "" + item.index}
      />
    </React.Fragment>
  );
};
