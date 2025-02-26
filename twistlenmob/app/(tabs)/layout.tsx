import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(tab1)" />
      <Tabs.Screen name="tab2" />
    </Tabs>
  );
}
