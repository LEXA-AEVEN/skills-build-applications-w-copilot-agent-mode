from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User(name='Batman', email='batman@dc.com', team=dc),
        ]
        for user in users:
            user.save()

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30, calories=300)
        Activity.objects.create(user=users[1], type='Cycling', duration=45, calories=450)
        Activity.objects.create(user=users[2], type='Swimming', duration=60, calories=600)
        Activity.objects.create(user=users[3], type='Yoga', duration=40, calories=200)

        # Create workouts
        w1 = Workout.objects.create(name='Hero HIIT', description='High intensity for heroes')
        w2 = Workout.objects.create(name='Power Yoga', description='Flexibility and strength')
        w1.suggested_for.set([users[0], users[1]])
        w2.suggested_for.set([users[2], users[3]])

        # Create leaderboards
        Leaderboard.objects.create(team=marvel, total_calories=750, total_duration=75)
        Leaderboard.objects.create(team=dc, total_calories=800, total_duration=100)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
