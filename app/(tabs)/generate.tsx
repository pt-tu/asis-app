import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayButton } from '@/components/ui/ClayButton';
import { Sparkles, CheckSquare, Square, RefreshCcw } from 'lucide-react-native';
import { Task } from '@/types';
import { TAG_COLORS } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client/react';
import {
  GENERATE_PLAN_MUTATION,
  APPROVE_TASKS_MUTATION,
} from '@/graphql/mutations/plan';

interface TaskPlanItem extends Omit<Task, 'id'> {
  tmpId: string;
  isNew?: boolean;
  isModified?: boolean;
  isSelected?: boolean;
}

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('Auto');
  const [isSmartAdjust, setIsSmartAdjust] = useState(false);
  const [clarificationOptions, setClarificationOptions] = useState<
    string[] | null
  >(null);
  const [generatedTasks, setGeneratedTasks] = useState<TaskPlanItem[] | null>(
    null,
  );
  const [errorToast, setErrorToast] = useState('');

  const [generatePlan, { loading: isGenerating }] = useMutation(
    GENERATE_PLAN_MUTATION,
  );
  const [approveTasks, { loading: isApproving }] = useMutation(
    APPROVE_TASKS_MUTATION,
  );

  const router = useRouter();

  const handleGenerate = async (finalPrompt: string) => {
    if (!finalPrompt.trim()) return;
    setErrorToast('');
    try {
      // Simulate API return based on prompt content
      await new Promise((r) => setTimeout(r, 1000));

      if (
        finalPrompt.toLowerCase().includes('clarify') &&
        !clarificationOptions
      ) {
        setClarificationOptions([
          'Lên lịch ôn tập Lý thuyết Nội khoa 2 tiếng chiều nay',
          'Tôi muốn chạy bộ 45p vào buổi sáng sớm',
          'Dời lịch trực gác và sắp xếp thời gian làm bài tập',
        ]);
        setGeneratedTasks(null);
      } else {
        setClarificationOptions(null);
        setGeneratedTasks([
          {
            tmpId: 'p1',
            task_name: finalPrompt,
            start_time: '14:00',
            end_time: '16:00',
            duration_minutes: 120,
            tag: 'Study',
            isNew: true,
            isSelected: true,
          },
          {
            tmpId: 'p2',
            task_name: 'Trực gác bệnh viện',
            start_time: '16:30',
            end_time: '08:00',
            duration_minutes: 930,
            tag: 'Work',
            isModified: true,
            isSelected: true,
          },
        ]);
        setPrompt('');
      }
    } catch (err) {
      setErrorToast('Generation failed. Please try again.');
    }
  };

  const toggleTaskSelection = (tmpId: string) => {
    if (!generatedTasks) return;
    setGeneratedTasks(
      generatedTasks.map((t) =>
        t.tmpId === tmpId ? { ...t, isSelected: !t.isSelected } : t,
      ),
    );
  };

  const updateTaskInline = (tmpId: string, updates: Partial<TaskPlanItem>) => {
    if (!generatedTasks) return;
    setGeneratedTasks(
      generatedTasks.map((t) => (t.tmpId === tmpId ? { ...t, ...updates } : t)),
    );
  };

  const handleApprove = async () => {
    if (!generatedTasks) return;

    const selectedTasks = generatedTasks.filter((t) => t.isSelected);
    if (selectedTasks.length === 0) return;

    setErrorToast('');
    try {
      await new Promise((r) => setTimeout(r, 800));

      setGeneratedTasks(null);
      router.replace('/(tabs)/timeline');
    } catch (e) {
      setErrorToast('Approval failed. Please check connection and try again.');
    }
  };

  const isLoading = isGenerating || isApproving;

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
          <View className="flex-1 justify-center items-center py-6">
            <View className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles size={32} color="hsl(22, 58%, 50%)" />
            </View>
            <Text className="text-3xl font-bold text-foreground text-center mb-2">
              AI Assistant
            </Text>
            <Text className="text-base text-muted-foreground text-center px-4">
              Delegate your schedule logic to the AI.
            </Text>
          </View>

          {/* Form & Toolbar area */}
          {!generatedTasks && !clarificationOptions && (
            <View
              className={`w-full bg-card rounded-[2rem] p-4 border border-border mt-auto shadow-clay ${isLoading ? 'opacity-50' : ''}`}
            >
              <TextInput
                className="w-full min-h-[100px] text-lg text-foreground mb-4 pt-2 bg-secondary/50 rounded-xl px-4"
                multiline
                placeholder="E.g. Clean the garage and organize tools this weekend..."
                placeholderTextColor="hsl(24, 12%, 48%)"
                textAlignVertical="top"
                value={prompt}
                onChangeText={setPrompt}
                editable={!isLoading}
              />

              {/* Category Toolbar */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {['Auto', 'Timeline', 'Health', 'Finance'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    disabled={isLoading}
                    className={`mr-2 px-4 py-1.5 rounded-full ${category === cat ? 'bg-primary' : 'bg-secondary'}`}
                  >
                    <Text
                      className={`font-bold text-sm ${category === cat ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Adjustment Toggle Toolbar */}
              <View className="flex-row items-center justify-between mb-4 bg-secondary/30 p-2 rounded-xl">
                <Text className="text-sm font-bold text-foreground">
                  Smart Adjust (Modify existing tasks)
                </Text>
                <Switch
                  value={isSmartAdjust}
                  onValueChange={setIsSmartAdjust}
                  disabled={isLoading}
                  trackColor={{ false: '#d1c8b8', true: 'hsl(22, 58%, 50%)' }}
                />
              </View>

              <ClayButton
                label={isGenerating ? 'Thinking...' : 'Generate Plan'}
                variant="primary"
                onPress={() => handleGenerate(prompt)}
                disabled={isLoading}
              />
            </View>
          )}

          {/* Clarification State */}
          {clarificationOptions && !isLoading && (
            <View className="w-full bg-card rounded-[2rem] p-4 border border-border mt-auto shadow-clay">
              <Text className="text-xl font-bold text-foreground mb-4">
                Can you clarify?
              </Text>
              <Text className="text-base text-muted-foreground mb-4">
                Please select the closest meaning to what you meant:
              </Text>

              <View className="space-y-3 gap-y-3">
                {clarificationOptions.map((opt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleGenerate(opt)}
                    className="bg-secondary p-4 rounded-2xl"
                  >
                    <Text className="text-base font-bold text-foreground">
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setClarificationOptions(null)}
                className="mt-4 py-3 items-center"
              >
                <Text className="text-muted-foreground font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Generated Plan Review State */}
          {generatedTasks && !isLoading && (
            <View className="w-full bg-card rounded-[2rem] p-4 border border-border mt-auto shadow-clay">
              <Text className="text-xl font-bold text-foreground mb-4">
                Review Plan
              </Text>

              {generatedTasks.map((task) => {
                const colors = TAG_COLORS[task.tag];
                return (
                  <View
                    key={task.tmpId}
                    className={`flex-row items-center border-l-4 pl-3 mb-4 ${task.isSelected ? 'opacity-100' : 'opacity-40'}`}
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    <TouchableOpacity
                      onPress={() => toggleTaskSelection(task.tmpId)}
                      className="mr-3 p-1"
                    >
                      {task.isSelected ? (
                        <CheckSquare size={24} color="hsl(22, 58%, 50%)" />
                      ) : (
                        <Square size={24} color="hsl(24, 12%, 48%)" />
                      )}
                    </TouchableOpacity>

                    <View className="flex-1 bg-secondary/50 p-2 rounded-xl">
                      <View className="flex-row items-center mb-1">
                        {task.isNew && (
                          <View className="bg-primary px-2 rounded-full mr-2">
                            <Text className="text-[10px] text-white font-bold">
                              NEW
                            </Text>
                          </View>
                        )}
                        {task.isModified && (
                          <RefreshCcw
                            size={14}
                            color="hsl(22, 58%, 50%)"
                            className="mr-2"
                          />
                        )}
                        <TextInput
                          className="text-base font-bold text-foreground flex-1 py-0 m-0"
                          value={task.task_name}
                          onChangeText={(txt) =>
                            updateTaskInline(task.tmpId, { task_name: txt })
                          }
                        />
                      </View>

                      <View className="flex-row items-center mt-1">
                        <TextInput
                          className="text-xs text-muted-foreground mr-1 py-0 m-0"
                          value={task.start_time}
                          onChangeText={(txt) =>
                            updateTaskInline(task.tmpId, { start_time: txt })
                          }
                        />
                        <Text className="text-xs text-muted-foreground mr-1">
                          -
                        </Text>
                        <TextInput
                          className="text-xs text-muted-foreground mr-2 py-0 m-0"
                          value={task.end_time}
                          onChangeText={(txt) =>
                            updateTaskInline(task.tmpId, { end_time: txt })
                          }
                        />
                        <Text className={`text-xs font-bold ${colors.text}`}>
                          {task.tag}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}

              <View className="mt-2 space-y-4 gap-y-4">
                <ClayButton
                  label={isApproving ? 'Approving...' : 'Approve to Timeline'}
                  variant="primary"
                  onPress={handleApprove}
                  disabled={isLoading}
                />
                <ClayButton
                  label="Discard Plan"
                  variant="outline"
                  onPress={() => {
                    setGeneratedTasks(null);
                    setPrompt('');
                  }}
                  disabled={isLoading}
                />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Global Loading Overlay inside Tab */}
        {isLoading && (
          <View className="absolute inset-0 items-center justify-center pointer-events-none bg-background/20">
            <View className="bg-card p-6 rounded-2xl shadow-clay flex-row items-center gap-4">
              <ActivityIndicator size="large" color="hsl(22, 58%, 50%)" />
              <Text className="text-foreground font-bold text-lg">
                Working...
              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Error Toast */}
      {errorToast ? (
        <View className="absolute bottom-10 left-4 right-4 bg-destructive rounded-xl p-4 shadow-xl flex-row items-center z-50">
          <Text className="text-destructive-foreground font-bold flex-1">
            {errorToast}
          </Text>
          <TouchableOpacity onPress={() => setErrorToast('')}>
            <Text className="text-destructive-foreground font-bold text-lg">
              ×
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
