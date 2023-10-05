// import { useRoute } from '@react-navigation/native';
// import { FlashList } from '@shopify/flash-list';
// import { Image } from 'expo-image';
// import React, { useCallback, useRef } from 'react';
// import { StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
// import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

// import { ImageType } from '<image>';
// import { SharePostPostingRouteProp } from '<SharePostRoutes>';

// enum MessageType {
//     Text,
//     Images,
// }

// interface TextMessage {
//     text: string;
//     type: MessageType.Text;
// }

// interface ImageMessage {
//     images: ImageType[];
//     type: MessageType.Images;
// }

// type Message = ImageMessage | TextMessage;

// export default function SharePostUpdate() {
//     const {
//         params: { post },
//     } = useRoute<SharePostPostingRouteProp<'update'>>();
//     const dimensions = useWindowDimensions();
//     const newData: Message[] = [
//         { images: post.images, type: MessageType.Images },
//         { text: post.contents, type: MessageType.Text },
//     ];

//     const flashListRef = useRef<FlashList<Message>>(null);

//     const { height } = useAnimatedKeyboard();
//     const animatedStyle = useAnimatedStyle(() => {
//         return {
//             height: height.value,
//         };
//     });

//     const renderItem = useCallback(
//         ({ item }: { item: Message }) => {
//             switch (item.type) {
//                 case MessageType.Text:
//                     return (
//                         <TextInput
//                             style={styles.textInput}
//                             defaultValue={item.text}
//                             multiline
//                             autoFocus
//                             scrollEnabled={false}
//                         />
//                     );
//                 case MessageType.Images:
//                     console.log(item.images);
//                     return (
//                         <View style={styles.image}>
//                             <FlashList
//                                 keyboardShouldPersistTaps={'always'}
//                                 data={item.images}
//                                 renderItem={({ item: imageItem }) => (
//                                     <Image
//                                         source={{
//                                             uri: imageItem.src.replace(
//                                                 'https://reptalie-region.s3.ap-northeast-2.amazonaws.com/',
//                                                 '',
//                                             ),
//                                         }}
//                                         style={[styles.image, { width: dimensions.width }]}
//                                         contentFit="cover"
//                                         placeholderContentFit="cover"
//                                         placeholder={require('@/assets/images/default_image.png')}
//                                     />
//                                 )}
//                                 estimatedItemSize={dimensions.width}
//                                 pagingEnabled
//                                 horizontal
//                             />
//                         </View>
//                     );
//             }
//         },
//         [dimensions.width],
//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.container}>
//                 <FlashList
//                     ref={flashListRef}
//                     keyboardShouldPersistTaps={'always'}
//                     data={newData}
//                     renderItem={renderItem}
//                     getItemType={(item) => item.type}
//                     estimatedItemSize={100}
//                     onContentSizeChange={(_, h) => {
//                         flashListRef.current?.scrollToOffset({ offset: h });
//                     }}
//                 />
//             </View>
//             <Animated.View style={animatedStyle} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     image: {
//         height: 300,
//     },
//     textInput: {
//         padding: 20,
//     },
// });
