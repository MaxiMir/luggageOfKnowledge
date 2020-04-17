import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { THEME } from '../theme';

export const HowToUseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur dolorem eos esse iusto. Architecto distinctio, earum, expedita harum impedit incidunt iusto labore necessitatibus officiis porro praesentium quam qui recusandae. Cumque harum in itaque placeat rerum suscipit tenetur ut. Ab ad autem laudantium libero nam placeat ratione. A aliquid architecto, atque autem commodi consequuntur delectus eligendi esse eum exercitationem explicabo ipsa minima nisi nobis odit quas quia quis quod, similique voluptates! Adipisci aspernatur autem consequuntur dignissimos dolorem doloribus eos eum harum, hic impedit in incidunt magnam, maxime optio pariatur possimus praesentium quia rerum, vero vitae! Culpa dolore eligendi fugit incidunt laboriosam maxime necessitatibus officiis ullam voluptas voluptates. Ab cum cumque cupiditate ea explicabo fugiat hic ipsam itaque libero quos. Alias cum distinctio, doloribus enim iusto, molestiae nam necessitatibus nihil placeat possimus quidem sapiente sit unde. Dicta ipsum iste, officiis quae quam sapiente? Aspernatur at corporis dolores ducimus eius illo in incidunt labore laboriosam laudantium necessitatibus officiis omnis, pariatur tenetur, totam! Esse hic minima repudiandae tenetur voluptates! Adipisci delectus fuga incidunt laboriosam nisi quis quo, recusandae sit. Aliquid assumenda at cumque deserunt dolorem dolores error esse fugit laborum libero minus molestias nobis nulla officia optio quaerat quidem repellat repellendus rerum sed soluta, sunt tempore vel veritatis voluptates? Accusamus aliquid asperiores consequatur dolorum ea, eligendi eum ex facere, libero molestiae nemo non numquam optio praesentium qui, quisquam ratione repellendus temporibus veniam veritatis. A asperiores at dolorem eum impedit magni molestiae praesentium qui quos recusandae. Accusamus alias, atque hic, illo impedit ipsam ipsum iusto mollitia nemo quae reiciendis sint totam ut vel vero. Accusantium alias aspernatur at, atque dicta esse est illum in incidunt iste magni nemo perferendis, quae quod reiciendis sed sequi sit soluta suscipit tempora, ullam velit voluptas voluptatum? Adipisci consectetur consequatur consequuntur cum earum eum ipsam, ipsum iusto maxime, neque nostrum optio porro possimus quae quas quia quidem quo reiciendis rem repudiandae sunt totam ut voluptate. Consectetur cumque deleniti ea eligendi esse impedit labore magnam minus, molestiae neque nostrum pariatur praesentium quas quidem sapiente similique soluta tempora ullam. Beatae dicta, fuga fugit incidunt ipsum molestiae nemo nesciunt repellat vero voluptatem! Accusamus corporis in modi quos repellendus similique, sit vitae voluptate. Aperiam atque commodi corporis culpa cumque ea explicabo facere illum nam numquam pariatur possimus praesentium, quos ratione reiciendis repellat suscipit tempora, unde. Adipisci cumque delectus, eum eveniet excepturi facere laudantium minus natus nostrum odio odit quae quas quos recusandae reiciendis rem repellat sequi ullam ut vel. Assumenda culpa cumque facilis labore, libero modi necessitatibus nulla omnis repudiandae similique sunt tempore ullam? A aliquam assumenda aut, dolore dolorum ducimus, esse est fugit id iure minus molestias nam natus nemo nisi numquam officia omnis placeat quae quasi quia quis quo repellat reprehenderit saepe sapiente vitae voluptatem. Amet architecto consequuntur corporis culpa debitis, deleniti dolorem ducimus earum fugit inventore ipsam maiores minima natus necessitatibus nisi obcaecati odio odit perferendis possimus quasi quidem quos recusandae rem reprehenderit sapiente, sit, ut voluptatem voluptates voluptatibus voluptatum! Accusamus ipsum, quod sequi tempora tempore vel. Ipsam minima natus odit, possimus provident quae sed suscipit. Assumenda cum eligendi enim iure libero neque perspiciatis suscipit tenetur ut voluptatem! Ea fugit impedit numquam quaerat quibusdam sequi voluptatum? Architecto asperiores consectetur, esse eum expedita impedit libero necessitatibus nihil numquam odio odit, possimus quisquam sapiente sunt ut veniam voluptatibus. Corporis, illo iure natus omnis quae sint ut vel veritatis voluptatem. Ipsa modi quia reprehenderit! Accusamus ad adipisci architecto assumenda blanditiis debitis distinctio dolorum exercitationem expedita illum ipsam laboriosam magni maiores, nesciunt nobis officiis optio pariatur perferendis provident quasi quia saepe sapiente sint suscipit temporibus? Ad architecto impedit magnam necessitatibus nisi obcaecati saepe voluptatem.
        </Text>
      </ScrollView>
    </View>
  )
}

HowToUseScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Как использовать приложение'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.BACKGROUND_COLOR,
    padding: 20
  }
})
