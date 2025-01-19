import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { graphql } from '@octokit/graphql';

const GitHubStats = () => {
  const [contributions, setContributions] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const graphqlWithAuth = graphql.defaults({
          headers: {
            authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });

        const { user } = await graphqlWithAuth(`
          query {
            user(login: "mide6x") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `);

        const contributions = user.contributionsCollection.contributionCalendar;
        setContributions(contributions);

        // Calculate current streak
        const days = contributions.weeks.flatMap(week => week.contributionDays);
        let streak = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].contributionCount > 0) {
            streak++;
          } else {
            break;
          }
        }
        setCurrentStreak(streak);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchContributions();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-lightNavy rounded-lg p-6 space-y-4"
    >
      <h3 className="text-xl font-bold text-textPrimary">
        GitHub Activity
      </h3>
      {contributions && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary">Total Contributions</p>
              <p className="text-3xl font-bold text-secondary">
                {contributions.totalContributions}
              </p>
            </div>
            <div>
              <p className="text-textSecondary">Current Streak</p>
              <p className="text-3xl font-bold text-secondary">
                {currentStreak} days
              </p>
            </div>
          </div>
          
          <div className="h-2 bg-lightestNavy rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubStats; 