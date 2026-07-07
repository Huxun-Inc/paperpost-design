import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { frontpostTokens } from '@frontpost/ui';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: frontpostTokens.color.paper }}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        <Text style={{ color: frontpostTokens.color.inkMuted, fontWeight: '700' }}>FrontPost · 前沿邮报</Text>
        <Text style={{ color: frontpostTokens.color.ink, fontSize: 36, fontWeight: '800', lineHeight: 42 }}>
          今日最值得读的前沿研究
        </Text>
        {['AI / LLM', 'Physics', 'Bio Medicine'].map((topic, index) => (
          <View key={topic} style={{ borderRadius: 20, backgroundColor: '#fff', padding: 18 }}>
            <Text style={{ color: frontpostTokens.color.proof, fontWeight: '800' }}>{index + 1}</Text>
            <Text style={{ marginTop: 8, color: frontpostTokens.color.ink, fontSize: 18, fontWeight: '700' }}>{topic}</Text>
            <Text style={{ marginTop: 6, color: frontpostTokens.color.inkMuted }}>5 top papers, summarized for your taste.</Text>
          </View>
        ))}
        <TouchableOpacity accessibilityRole="button" style={{ minHeight: 44, borderRadius: 999, backgroundColor: frontpostTokens.color.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>刷新推荐</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
