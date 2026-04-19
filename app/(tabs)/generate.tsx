import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayButton } from '../../components/ui/ClayButton';
import { ClayCard } from '../../components/ui/ClayCard';
import { Sparkles, CheckCircle2 } from 'lucide-react-native';
import { useAppStore, Task, TAG_COLORS } from '../../context/useAppStore';
import { useRouter } from 'expo-router';

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<
    Omit<Task, 'id'>[] | null
  >(null);

  const addTask = useAppStore((state) => state.addTask);
  const router = useRouter();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI extraction logic for 1.5s
    setTimeout(() => {
      setGeneratedTasks([
        {
          task_name: 'Ôn tập Sinh lý học & Nội tiết',
          start_time: '14:00',
          end_time: '16:00',
          duration_minutes: 120,
          tag: 'Study',
        },
        {
          task_name: 'Chạy bộ khuông viên ký túc xá',
          start_time: '17:30',
          end_time: '18:15',
          duration_minutes: 45,
          tag: 'Health',
        },
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleApprove = () => {
    if (generatedTasks) {
      generatedTasks.forEach((task) => addTask(task));
      setGeneratedTasks(null);
      setPrompt('');
      router.replace('/(tabs)/timeline');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center py-10">
            <View className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles size={32} color="hsl(22, 58%, 50%)" />
            </View>
            <Text className="text-3xl font-bold text-foreground text-center mb-4">
              AI Assistant
            </Text>
            <Text className="text-lg text-muted-foreground text-center px-4">
              Let the AI break down your goal into a perfect timeline planner.
            </Text>
          </View>

          {isGenerating ? (
            <View className="w-full bg-card rounded-[2rem] p-10 border border-border mt-auto items-center justify-center shadow-sm min-h-[220px]">
              <ActivityIndicator size="large" color="hsl(22, 58%, 50%)" />
              <Text className="text-primary font-bold mt-4 text-lg">
                Thinking...
              </Text>
            </View>
          ) : generatedTasks ? (
            <View className="w-full bg-card rounded-[2rem] p-4 border border-border mt-auto shadow-sm">
              <Text className="text-xl font-bold text-foreground mb-4">
                Preview Plan
              </Text>
              {generatedTasks.map((task, idx) => {
                const colors = TAG_COLORS[task.tag];
                return (
                  <View
                    key={idx}
                    className="flex-row items-center border-l-4 pl-3 mb-4"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    <View className="flex-1">
                      <Text className="text-base font-bold text-foreground">
                        {task.task_name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-xs text-muted-foreground mr-2">
                          {task.start_time} - {task.end_time}
                        </Text>
                        <Text className={`text-xs font-bold ${colors.text}`}>
                          {task.tag}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
              <ClayButton
                label="Approve to Timeline"
                variant="primary"
                onPress={handleApprove}
                className="mt-2"
              />
              <ClayButton
                label="Discard"
                variant="outline"
                onPress={() => setGeneratedTasks(null)}
                className="mt-4"
              />
            </View>
          ) : (
            <View className="w-full bg-card rounded-[2rem] p-4 border border-border mt-auto shadow-sm">
              <TextInput
                className="w-full min-h-[100px] text-lg text-foreground mb-4 pt-2"
                multiline
                placeholder="E.g. Clean the garage and organize tools this weekend..."
                placeholderTextColor="hsl(24, 12%, 48%)"
                textAlignVertical="top"
                value={prompt}
                onChangeText={setPrompt}
              />
              <ClayButton
                label="Generate Plan"
                variant="primary"
                onPress={handleGenerate}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
