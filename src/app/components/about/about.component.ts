import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  teamMembers = [
  {
    name: 'Gentang Funue',
    role: 'Project Manager/ Lead Developer: Specialty in System Architecture and Security',
    responsibilities: [
      'Coordinating with team members to define project objectives, scope, and deliverables, ensuring alignment with academic requirements.',
      "Leading the development of the project's server-side architecture, ensuring efficient database management and server communication.",
      'Implementing security protocols and encryption techniques to safeguard sensitive data and user information.',
      'Monitoring project progress and adjusting plans as needed to meet deadlines and academic standards.',
      'Presenting project updates and findings to academic advisors and stakeholders, incorporating feedback into the development process.'
    ],
  },
  {
    name: 'Wilkinson Caleb',
    role: 'Project Documentation/ AWS: Specialty in User Interface and AWS Deployment',
    responsibilities: [
      'Designing and developing user-friendly interfaces for the project, focusing on accessibility and usability for diverse users.',
      "Setting up and managing the project's cloud infrastructure on AWS, ensuring scalability and cost-effectiveness.",
      'Creating comprehensive documentation for the project, including user manuals, technical specifications, and deployment guides.',
      'Collaborating with the development team to integrate front-end and back-end components seamlessly.',
      'Conducting user testing sessions to gather feedback and make necessary adjustments to the user interface.'
    ],
  },
  {
    name: 'Agyekum Philip',
    role: 'Security Consultant/ Database Administrator/Developer: Specialty in Database Design and Management',
    responsibilities: [
      'Advising the team on best practices for data security and privacy, conducting regular security assessments to identify vulnerabilities.',
      'Designing and implementing a robust database structure to efficiently store and retrieve project data.',
      'Optimizing database performance to ensure smooth operation and quick access to information.',
      'Collaborating with developers to integrate security measures into the application code and database interactions.',
      'Staying updated with the latest trends in cybersecurity and database management to apply relevant techniques to the project.'
    ],
  },
];

}
