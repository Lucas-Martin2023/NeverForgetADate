/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar style={{ backgroundColor: '#666F80' }} collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link passHref href="/events">
          <Navbar.Brand className="nfad-nav">Never Forget A Date</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Link passHref href="/events">
              <Nav.Link>View Events</Nav.Link>
            </Link>
            <Link passHref href="/event/new">
              <Nav.Link>Add Event</Nav.Link>
            </Link>
            <Link passHref href="/dates">
              <Nav.Link>View Dates</Nav.Link>
            </Link>
            <Link passHref href="/date/new">
              <Nav.Link>Add Date</Nav.Link>
            </Link>
            <Button type="button" className="btn-danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
