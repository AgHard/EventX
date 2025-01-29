import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';

const Create = () => {


  return (
    <SafeAreaView className="h-full bg-primary">
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          key={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <EmptyState
              title=""
              subtitle="Coming Soon......."
            />
          )}
        />
    </SafeAreaView>
  );
};

export default Create;
