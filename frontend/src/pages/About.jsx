import React from "react";

export default function About() {
  return (
    <main className="about-page">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="about-hero container">
        <div className="about-badge">ABOUT JOBFINDER</div>

        <h1>
          Find opportunities.
          <br />
          Build your career.
        </h1>

        <p>
          JobFinder is a modern job search and application tracking platform
          built to make the job-hunting process simpler, more organized, and
          more manageable.
        </p>
      </section>


      {/* =====================================================
          ABOUT JOBFINDER
          ===================================================== */}
      <section className="about-section container">
        <div className="about-card">

          <span className="about-number">01</span>

          <h2>About JobFinder</h2>

          <p>
            JobFinder was created to bring job discovery and application
            management into one simple platform. Instead of searching for
            opportunities and managing applications across multiple places,
            users can search for jobs, save interesting opportunities, and
            keep track of their application progress in one workspace.
          </p>

          <p>
            The platform is designed especially with students, fresh
            graduates, and job seekers in mind.
          </p>

        </div>
      </section>


      {/* =====================================================
          FEATURES
          ===================================================== */}
      <section className="about-section container">

        <div className="section-heading">
          <span className="about-number">02</span>
          <h2>What You Can Do</h2>
        </div>

        <div className="about-feature-grid">

          {/* Search Jobs */}
          <div className="about-feature">

            <div className="feature-icon">
              ⌕
            </div>

            <h3>Search Jobs</h3>

            <p>
              Discover job opportunities and explore positions that match
              your interests.
            </p>

          </div>


          {/* Save Jobs */}
          <div className="about-feature">

            <div className="feature-icon">
              ☆
            </div>

            <h3>Save Jobs</h3>

            <p>
              Save interesting opportunities so you can easily return to them
              later.
            </p>

          </div>


          {/* Track Applications */}
          <div className="about-feature">

            <div className="feature-icon">
              ✓
            </div>

            <h3>Track Applications</h3>

            <p>
              Keep your applications organized and track their current
              status.
            </p>

          </div>


          {/* Stay Organized */}
          <div className="about-feature">

            <div className="feature-icon">
              →
            </div>

            <h3>Stay Organized</h3>

            <p>
              Keep your job search activities together in one personal
              workspace.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOUNDER
          ===================================================== */}
      <section className="about-section container">

        <div className="founder-card">

          {/* Founder Photo */}
          <div className="founder-photo-wrap">

            <img
              src="/roopesh.jpg"
              alt="Matada Roopesh"
              className="founder-photo"
            />

          </div>


          {/* Founder Content */}
          <div className="founder-content">

            <span className="about-number">
              03
            </span>

            <p className="founder-label">
              MEET THE FOUNDER
            </p>

            <h2>
              Matada Roopesh
            </h2>

            <h3>
              Founder & Full-Stack Developer
            </h3>


            <p>
              I am a Computer Science and Engineering graduate specializing
              in Cloud Computing, with a strong interest in software
              development, cloud technologies, and building practical
              applications that solve real-world problems.
            </p>


            <p>
              I created JobFinder as a project to combine my interest in
              full-stack development with a real-world problem faced by
              students and job seekers: keeping the job search organized.
            </p>


            <p>
              With JobFinder, my goal is to create a simple platform where
              users can discover opportunities, save jobs they are interested
              in, and manage their application journey from one place.
            </p>


            {/* Founder Details */}
            <div className="founder-details">

              <div>
                <strong>
                  Education
                </strong>

                <span>
                  B.Tech in Computer Science & Engineering
                  <br />
                  Specialization in Cloud Computing
                </span>
              </div>


              <div>
                <strong>
                  University
                </strong>

                <span>
                  SRM Institute of Science and Technology
                </span>
              </div>


              <div>
                <strong>
                  Focus
                </strong>

                <span>
                  Full-Stack Development · Cloud Computing · Software
                  Development
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TECHNOLOGY
          ===================================================== */}
      <section className="about-section container">

        <div className="section-heading">

          <span className="about-number">
            04
          </span>

          <h2>
            Built With
          </h2>

        </div>


        <div className="tech-list">

          <span>React</span>

          <span>Java</span>

          <span>Spring Boot</span>

          <span>MySQL</span>

          <span>REST API</span>

          <span>JWT</span>

          <span>Vercel</span>

          <span>Railway</span>

          <span>GitHub</span>

        </div>

      </section>


      {/* =====================================================
          VISION
          ===================================================== */}
      <section className="about-section container">

        <div className="vision-card">

          <span className="about-number">
            05
          </span>

          <h2>
            Our Vision
          </h2>


          <p>
            Job searching can become overwhelming when opportunities,
            applications, and follow-ups are spread across different
            platforms. JobFinder aims to make that journey more structured
            and easier to manage.
          </p>


          <p className="vision-highlight">
            Search smarter. Stay organized. Move closer to your next
            opportunity.
          </p>

        </div>

      </section>

    </main>
  );
}