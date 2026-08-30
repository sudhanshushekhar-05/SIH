import 'package:flutter/material.dart';

void main() {
  runApp(const MindsetNerApp());
}

class MindsetNerApp extends StatelessWidget {
  const MindsetNerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MINDSET-NER',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          primary: const Color(0xFF2563EB),
          secondary: const Color(0xFFD97706),
        ),
        textTheme: const TextTheme(
          displayLarge: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
          bodyLarge: TextStyle(fontSize: 20.0, fontWeight: FontWeight.w600, color: Color(0xFF1E293B)),
        ),
        useMaterial3: true,
      ),
      home: const ElderlyHomeScreen(),
    );
  }
}

class ElderlyHomeScreen extends StatefulWidget {
  const ElderlyHomeScreen({super.key});

  @override
  State<ElderlyHomeScreen> createState() => _ElderlyHomeScreenState();
}

class _ElderlyHomeScreenState extends State<ElderlyHomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _views = [
    const ElderlyGameHubView(),
    const CaregiverDashboardView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🧠 MINDSET-NER (SIH26003)', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF2563EB),
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.wifi_off),
            tooltip: 'Offline Sync Mode',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Offline mode active. All games and reminders stored locally.')),
              );
            },
          )
        ],
      ),
      body: _views[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        selectedItemColor: const Color(0xFF2563EB),
        selectedFontSize: 16.0,
        unselectedFontSize: 14.0,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.psychology, size: 30), label: '👴 Elderly App'),
          BottomNavigationBarItem(icon: Icon(Icons.health_and_safety, size: 30), label: '👩‍⚕️ Caregiver App'),
        ],
      ),
    );
  }
}

class ElderlyGameHubView extends StatelessWidget {
  const ElderlyGameHubView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFBFDBFE)),
            ),
            child: const Row(
              children: [
                CircleAvatar(
                  backgroundColor: Color(0xFF2563EB),
                  child: Icon(Icons.smart_toy, color: Colors.white),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'AI साथी आशा: "नमस्ते! आज 11 बजे आपका मेमोरी गेम है। "',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 20),
          const Text('दिमागी खेल (Cognitive Games)', style: TextStyle(fontSize: 22, fontWeight: FontWeight.extrabold)),
          const SizedBox(height: 12),
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              children: [
                _buildGameCard(context, '🍎 Objects Memory', 'वस्तुएं याद रखें', Colors.blue.shade100),
                _buildGameCard(context, '🌸 Local NER Memory', 'उत्तर-पूर्वी संस्कृति', Colors.amber.shade100),
                _buildGameCard(context, '👩‍👧 Family Memory', 'पारिवारिक पहचान', Colors.purple.shade100),
                _buildGameCard(context, '🌅 Routine Recall', 'दिनचर्या का क्रम', Colors.green.shade100),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildGameCard(BuildContext context, String title, String subtitle, Color color) {
    return Card(
      elevation: 4,
      color: color,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Starting $title...')),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              const SizedBox(height: 8),
              Text(subtitle, style: const TextStyle(fontSize: 14, color: Colors.black54), textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}

class CaregiverDashboardView extends StatelessWidget {
  const CaregiverDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            color: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Patient: Ramesh Sharma', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                      Text('Age: 74 | Caregiver: Ananya Sharma', style: TextStyle(fontSize: 14, color: Colors.grey)),
                    ],
                  ),
                  CircleAvatar(
                    radius: 30,
                    backgroundColor: Colors.green,
                    child: Text('78%', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                  )
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF1F2),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFFECDD3)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('⚠️ AI Early-Warning Alert', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF9F1239))),
                SizedBox(height: 4),
                Text('Cognitive engagement score dipped by 5.2% over past 7 days.', style: TextStyle(fontSize: 15, color: Color(0xFFBE123C))),
              ],
            ),
          )
        ],
      ),
    );
  }
}
