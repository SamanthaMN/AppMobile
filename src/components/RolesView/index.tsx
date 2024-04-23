import { Text, View } from "react-native"
import { BorderlessButton, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

import styles from './styles'

type Props = {
    role: any,
    edit: (id: number) => void,
    remove: (id: number) => void,
}

type DeleteProps = {
    remove: () => void,
}

function DeleteButton({ remove }: DeleteProps) {
    return (
        <View style={styles.deleteContainer}>
            <BorderlessButton onPress={() => remove()}>
                <Text style={styles.deleteText}>DELETE</Text>
            </BorderlessButton>
        </View>
    )
}

export default function RolesView({ role, edit, remove }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <DeleteButton remove={() => remove(role.id)} />}>
                <View style={styles.container} onTouchEnd={() => edit(role.id)}>
                    <Text style={styles.title}>{role.name}</Text>
                    <Text style={styles.subTitle}>{role.description}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}